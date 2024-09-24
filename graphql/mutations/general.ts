import { graphql } from "../generated";

export const UPLOAD_FILE = graphql(`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`);
