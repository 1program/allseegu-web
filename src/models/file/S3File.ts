export interface S3File {
  bucket: string;
  headers: Record<string, string | string[]>;
  key: string;
  url: string;
  uuid: string;
}
