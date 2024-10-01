import { graphql } from "../generated";

export const REGISTER_USER = graphql(`
  mutation Register($input: RegisterInputDto!) {
    register(input: $input) {
      message
    }
  }
`);

export const LOGIN = graphql(`
  mutation Login($input: LoginInputDto!) {
    login(input: $input) {
      authTokens {
        accessToken
        expiresIn
        refreshToken
      }
      user {
        id
        email
        name
        created_at
        profileImage
        updated_at
      }
    }
  }
`);

export const REFRESH_TOKEN = graphql(`
  mutation RefreshToken {
    refreshToken {
      accessToken
      expiresIn
      refreshToken
    }
  }
`);

export const VERIFY_EMAIL = graphql(`
  mutation VerifyEmail($input: VerifyEmailInputDto!) {
    verifyEmail(input: $input) {
      message
    }
  }
`);

export const SEND_FORGOT_PASSWORD_EMAIL = graphql(`
  mutation SendForgotPasswordEmail($email: String!) {
    sendForgotPasswordEmail(email: $email) {
      message
    }
  }
`);

export const VERIFY_OTP = graphql(`
  mutation VerifyOtp($email: String!, $otp: String!) {
    verifyOtp(email: $email, otp: $otp) {
      message
    }
  }
`);
