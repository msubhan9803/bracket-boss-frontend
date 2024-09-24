export interface UploadFileResponse {
  uploadFile: {
    url: string;
  };
}

export interface UploadFileVariables {
  file: File;
}
