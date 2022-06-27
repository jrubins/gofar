export {}

declare global {
  interface Window {
    ENV: {
      SEGMENT_WRITE_KEY: string
    }
  }
}
