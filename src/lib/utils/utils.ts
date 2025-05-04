import { badHint } from "@/services/hint";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * Combines and merges CSS class names, resolving conflicts using Tailwind's class merging strategy.
 *
 * @param inputs - An array of class values to be combined. These can be strings, objects, or arrays.
 * @returns A string of merged class names, optimized for Tailwind CSS.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === "accurate" ? accurateSizes[i] ?? "Bytes" : sizes[i] ?? "Bytes"}`;
}

export function getRandomInteger(from: number, to: number) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

export async function downloadFiles(files: { filePath: string; fileName: string }[]) {
  if (files.length) {
    try {
      const filesBlobs: { fileBlob: Blob; fileName: string }[] = await Promise.all(
        files.map(async ({ filePath, fileName }) => {
          const fileResponse = await fetch(baseUrl + filePath);
          if (!fileResponse.ok) throw new Error("Failed to fetch the file: " + fileName);
          else {
            const fileBlob = await fileResponse.blob();
            return { fileBlob, fileName: fileName + "." + filePath.split(".").pop() };
          }
        })
      );

      if (filesBlobs.length) {
        const link = document.createElement("a");
        link.style.display = "none";
        document.body.appendChild(link);
        filesBlobs.forEach(({ fileBlob, fileName }) => {
          const url = URL.createObjectURL(fileBlob);
          link.href = url;
          link.download = fileName;
          link.click();
          URL.revokeObjectURL(url);
        });
        document.body.removeChild(link);
      }
    } catch (error) {
      badHint(error as string);
    }
  } else badHint("No files to download!");
}

export async function downloadFile(fileBlob: Blob, fileName: string) {
  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);
  const url = URL.createObjectURL(fileBlob);
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(link);

  // const url = URL.createObjectURL(fileBlob);
  // const newTab = window.open(url, "_blank");

  // if (!newTab) {
  //   console.error("Failed to open new tab. The popup might have been blocked.");
  // }

  // setTimeout(() => {
  // URL.revokeObjectURL(url);
  // }, 1000);
}
