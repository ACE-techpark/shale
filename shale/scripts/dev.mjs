import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { EOL } from "node:os";

const require = createRequire(import.meta.url);
const nextCli = require.resolve("next/dist/bin/next");
const child = spawn(
  process.execPath,
  [nextCli, "dev", "-H", "0.0.0.0"],
  {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["inherit", "pipe", "pipe"],
    detached: process.platform !== "win32",
    windowsHide: true,
  },
);

let localUrl = null;
let isReady = false;
let browserOpened = false;
let forceStopTimer;
let stopRequested = false;

function openBrowser(url) {
  if (browserOpened || !localUrl || !isReady) return;
  browserOpened = true;

  let command;
  let args;
  if (process.platform === "win32") {
    command = process.env.ComSpec || "cmd.exe";
    args = ["/c", "start", "", url];
  } else if (process.platform === "darwin") {
    command = "open";
    args = [url];
  } else {
    command = "xdg-open";
    args = [url];
  }

  const opener = spawn(command, args, {
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  });
  opener.on("error", (error) => {
    process.stderr.write(`Could not open the browser: ${error.message}${EOL}`);
  });
  opener.unref();
}

function inspectLine(line) {
  const clean = line.replace(/\u001b\[[0-9;]*m/g, "");
  const localMatch = clean.match(/\bLocal:\s*(https?:\/\/[^\s]+)/i);
  if (localMatch) {
    try {
      const parsed = new URL(localMatch[1]);
      if (parsed.hostname !== "0.0.0.0") localUrl = parsed.href;
    } catch {
      // Ignore incomplete or malformed status lines.
    }
  }
  if (/\bReady\b/i.test(clean)) isReady = true;
  if (localUrl && isReady) openBrowser(localUrl);
}

function pipeOutput(stream, destination) {
  let pending = "";
  stream.on("data", (chunk) => {
    destination.write(chunk);
    pending += chunk.toString("utf8");
    const lines = pending.split(/\r?\n/);
    pending = lines.pop() ?? "";
    for (const line of lines) inspectLine(line);
  });
  stream.on("end", () => {
    if (pending) inspectLine(pending);
  });
  stream.on("error", (error) => {
    process.stderr.write(`Dev server output error: ${error.message}${EOL}`);
  });
}

pipeOutput(child.stdout, process.stdout);
pipeOutput(child.stderr, process.stderr);

function forwardSignal(signal) {
  if (stopRequested || child.exitCode !== null || child.signalCode !== null) return;
  stopRequested = true;
  if (process.platform === "win32") {
    child.kill(signal);
  } else {
    try {
      process.kill(-child.pid, signal);
    } catch {
      child.kill(signal);
    }
  }

  forceStopTimer = setTimeout(() => {
    if (process.platform === "win32") {
      const treeStop = spawn(
        "taskkill.exe",
        ["/pid", String(child.pid), "/t", "/f"],
        { stdio: "ignore", windowsHide: true },
      );
      treeStop.on("error", (error) => {
        stopWindowsProcess(error.message);
      });
      treeStop.on("exit", (code) => {
        if (code !== 0) stopWindowsProcess("taskkill could not stop the process tree");
      });
    } else {
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch {
        child.kill("SIGKILL");
      }
    }
  }, 1500);
  forceStopTimer.unref();
}

function stopWindowsProcess(reason) {
  const fallback = spawn(
    "powershell.exe",
    [
      "-NoProfile",
      "-NonInteractive",
      "-Command",
      `Stop-Process -Id ${child.pid} -Force -ErrorAction SilentlyContinue`,
    ],
    { stdio: "ignore", windowsHide: true },
  );
  fallback.on("error", (error) => {
    process.stderr.write(
      `Could not stop the dev server process tree (${reason}): ${error.message}${EOL}`,
    );
  });
}

for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(signal, () => forwardSignal(signal));
}

child.on("error", (error) => {
  process.stderr.write(`Could not start Next.js: ${error.message}${EOL}`);
});

child.on("exit", (code, signal) => {
  if (!stopRequested) clearTimeout(forceStopTimer);
  child.stdout.destroy();
  child.stderr.destroy();
  const signalExitCodes = { SIGINT: 130, SIGTERM: 143, SIGHUP: 129 };
  process.exitCode = code ?? signalExitCodes[signal] ?? 1;
});
