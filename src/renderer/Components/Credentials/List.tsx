/**
 * List.tsx
 *
 * Description:
 *    List all the Credentials.
 *
 */

import AddCredentialForm from '../Elements/Form/CredentialForm';

const List = () => {
  const formSubmitAction = (formData: Record<string, unknown>) => {
    console.log(formData);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex flex-column align-items-center add-credential-card">
        <AddCredentialForm submitAction={formSubmitAction} />
      </div>

      <div className="d-flex flex-row flex-wrap justify-content-evenly">
        List of Credentials
      </div>
    </div>
  );
};

export default List;
