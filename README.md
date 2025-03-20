What is JWT Authentication?
JWT is a token-based authentication system where:

User sends login credentials.
Server validates the credentials and generates a JWT token.
Token is sent back to the client.
On subsequent requests, the client sends the token in the header (Authorization: Bearer <token>).
The server verifies the token and allows or denies access based on the user’s identity.