/**
 * Credential.ts
 *
 * Description:
 *    Resolves requests regarding Credential.
 *
 */

import { CONSTANT, createMessage } from '../../common';
import { decryptData, encryptData } from '../secure-util';
import database from './../sql';

// Constant Endpoint String.
const { ENDPOINT, MSG_CODE } = CONSTANT;

// Constant Message String.
const MSG_STR = {
  CRED_ADD_FAILED: `Error while adding Credential !`,
  CRED_UPDATE_FAILED: `Error while saving Credential !`,
};

/**
 * Handles Credential related requests.
 *
 * @param requestURI
 * @param requestData
 * @param resolvedSubResponse
 */
const credential = (
  requestURI: string[],
  resolvedSubResponse: SubRequestResponseType,
  requestData: CredentialRequestType
): void => {
  let payloadRequestData;

  switch (requestURI[1]) {
    case ENDPOINT.ADD:
      payloadRequestData = requestData.data as CredentialDataType;

      const newCredentialBody = {
        title: payloadRequestData.credential.title,
        secure: encryptData(
          requestData.s_pin,
          JSON.stringify(payloadRequestData.credential.secure)
        ),
      };

      const createStatus = database.createNewCredential(
        payloadRequestData.space_id as number,
        JSON.stringify(newCredentialBody)
      );

      if (createStatus.changes) {
        // Get newly inserted Credential.
        const recentlyAddedCred: CredentialsTableInterface =
          database.getCredentialWithId(createStatus.lastInsertRowid);

        const newCredential: CredentialDataType = {
          _id: recentlyAddedCred._id,
          space_id: recentlyAddedCred.space_id,
          updated_at: recentlyAddedCred.updated_at,
          credential: JSON.parse(recentlyAddedCred.credential),
        };

        delete newCredential.credential.secure;

        resolvedSubResponse.data = newCredential;
      }

      resolvedSubResponse.message = createStatus.changes
        ? // Credential Added Successfully.
          createMessage(MSG_CODE.SUCCESS)
        : // Error while updating Credential.
          createMessage(MSG_CODE.ERR_SERVER, MSG_STR.CRED_ADD_FAILED);
      break;

    case ENDPOINT.UPDATE:
      payloadRequestData = requestData.data as CredentialDataType;

      const updatedCredential = {
        title: payloadRequestData.credential.title,
        secure: encryptData(
          requestData.s_pin,
          JSON.stringify(payloadRequestData.credential.secure)
        ),
      };

      // Update Credential.
      const updateStatus = database.updateCredential(
        {
          credential: JSON.stringify(updatedCredential),
          updated_at: payloadRequestData.updated_at,
        },
        payloadRequestData._id
      );

      if (updateStatus) resolvedSubResponse.data = payloadRequestData;

      resolvedSubResponse.message = updateStatus
        ? // Credential updated Successfully.
          createMessage(MSG_CODE.SUCCESS)
        : // Error while updating Credential.
          createMessage(MSG_CODE.ERR_SERVER, MSG_STR.CRED_UPDATE_FAILED);
      break;

    case ENDPOINT.GET:
      payloadRequestData = requestData.data as number;

      const encryptionKey =
        resolvedSubResponse.data != undefined
          ? (resolvedSubResponse.data as AuthPinRequestType)?.s_pin
          : requestData.s_pin;

      const credentialData: CredentialsTableInterface =
        database.getCredentialWithId(payloadRequestData);

      const credentialBody: CredentialBodyType = JSON.parse(
        credentialData.credential
      );

      const decryptedCred = decryptData(
        encryptionKey,
        `${credentialBody.secure}`
      );

      credentialBody.secure = JSON.parse(decryptedCred);

      resolvedSubResponse.data = {
        ...(resolvedSubResponse.data as object),
        data: {
          ...credentialData,
          credential: credentialBody,
        },
      };

      if (resolvedSubResponse.message == undefined)
        resolvedSubResponse.message = createMessage(MSG_CODE.SUCCESS);
      break;

    case ENDPOINT.GET_ALL:
      // Get all Credentials.
      const credentialList: CredentialsTableInterface[] =
        database.getCredentials(
          (resolvedSubResponse.data as SpaceInterface).space_id
        );

      // Converting to type of CredentialStoreType[] from CredentialsTableInterface[].
      const credentialListSanitized: CredentialDataType[] = credentialList.map(
        ({ _id, credential, updated_at }: CredentialsTableInterface) => {
          const parsedCredential: CredentialBodyType = JSON.parse(credential);
          return {
            _id,
            credential: { title: parsedCredential.title },
            updated_at,
          } as CredentialDataType;
        }
      );

      resolvedSubResponse.data = {
        ...(resolvedSubResponse.data as object),
        credentials: credentialListSanitized,
      };
      break;

    default:
      break;
  }
};

export { credential as resolveCredential };
