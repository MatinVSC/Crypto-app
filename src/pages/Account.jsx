import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h2">Update your Email account</Heading>

      <Row type='vertical'>
        {/* <Heading as="h3">Update user data</Heading> */}
        <UpdateUserDataForm />
      </Row>

      <Row type='vertical'>
        <Heading as="h3">Update your Password account</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
