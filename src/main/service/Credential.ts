/**
 * Credential.ts
 *
 * Description:
 *    Resolves requests regarding Credential.
 *
 */

import { decryptData, encryptData } from '../secure-util';
import { createMessage } from '../../common';
import database from './../sql';

const CONSTANT = {
  ADD: `ADD`,
  UPDATE: `UPDATE`,
  GET: `GET`,
};

/**
 * Handles Credentials related requests.
 *
 * @param requestType
 * @param requestData
 * @param resolvedSubRequest
 */
const credential = (
  requestType: string[],
  requestData: CredentialRequestType,
  resolvedSubRequest: SubRequestResponseType
): void => {
  let payloadRequestData;

  switch (requestType[1]) {
    case CONSTANT.ADD:
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

        resolvedSubRequest.data = newCredential;
      }

      resolvedSubRequest.message = createStatus.changes
        ? // Credential Added Successfully.
          createMessage('success')
        : // Error while updating Credential.
          createMessage('server-error', `Error while adding credential.`);
      break;

    case CONSTANT.UPDATE:
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

      if (updateStatus) resolvedSubRequest.data = payloadRequestData;

      resolvedSubRequest.message = updateStatus
        ? // Credential updated Successfully.
          createMessage('success')
        : // Error while updating Credential.
          createMessage('server-error', `Error while saving credential.`);
      break;

    case CONSTANT.GET:
      payloadRequestData = requestData.data as number;

      const encryptionKey =
        resolvedSubRequest.data != undefined
          ? (resolvedSubRequest.data as AuthPinRequestType)?.s_pin
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

      resolvedSubRequest.data = {
        ...(resolvedSubRequest.data as object),
        data: {
          ...credentialData,
          credential: credentialBody,
        },
      };

      if (resolvedSubRequest.message == undefined)
        resolvedSubRequest.message = createMessage('success');
      break;

    default:
      // Invalid Sub Request.
      resolvedSubRequest.message = createMessage(
        'client-error',
        'Invalid Request'
      );
      break;
  }
};

export { credential as resolveCredential };
