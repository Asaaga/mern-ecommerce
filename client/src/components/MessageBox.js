import Alert from 'react-bootstrap/Alert';

const MessageBox = (props) => {
  return (
    <Alert variance={props.variant || ''}>{props.children}</Alert>
  );
}

export default MessageBox;



