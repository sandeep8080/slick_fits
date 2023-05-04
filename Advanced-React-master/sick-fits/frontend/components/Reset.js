import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const error = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    const res = await reset();
    console.log(res);
    resetForm();
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset you Password!</h2>
      <DisplayError error={error} />
      <fieldset aria-busy={loading} disabled={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Password reset successfully!! Please log in with new password</p>
        )}
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your Email Address"
            onChange={handleChange}
            value={inputs.email}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            onChange={handleChange}
            value={inputs.password}
          />
        </label>
        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
}
