export declare namespace App {
  interface GoogleLogin {
    aud: string;
    azp: string;
    email: string;
    email_verified: boolean;
    exp: number;
    iss: string;
    jti: string;
    name: string;
    picture: string;
    sub: string;
  }

  interface PerformSearch {
    userId: number | undefined;
    query: string;
  }
}
