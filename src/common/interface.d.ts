/**
 * interface.d.ts
 *
 * Description:
 *    Interface Declaration.
 *
 */

// ================================================================================
// IPC Communication.
// ================================================================================

interface contextBridgeAPI {
  send: (channel: string, data: string) => Promise<void>;
  receive: (channel: string, func: unknown) => Promise<void>;
}

interface MessageInterface {
  status: string | number;
  message?: string;
}

interface IPCRequestInterface {
  URI: string;
  timestamp: number;
  data?: unknown | object;
}

interface IPCResponseInterface extends IPCRequestInterface, MessageInterface {}

// ================================================================================
// Elements
// ================================================================================

interface InputElementInterface {
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  required?: boolean;
}

interface ButtonElementInterface {
  className?: string;
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

interface FormElementInterface {
  className?: string;
  formFields: FormType;
  inputElements: InputElementInterface[];
  method: string;
  reset?: boolean;
  submitAction: (form: FormType) => void;
}

// ================================================================================
// Authentication.
// ================================================================================

interface AuthCredentialInterface {
  username: string;
  password: string;
}
