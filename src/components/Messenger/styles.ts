import { styled } from '@mui/material';

export const SendImage = styled('img')({
    width: '20px',
    height: '20px',
});

export const UsernameLabel = styled('label')({
    fontSize: '12px',
    color: 'grey',
});

export const MessageList = styled('ul')({
    width: '100%',
    height: '100%',
    margin: '0',
    padding: '14px',
    overflow: 'auto',
    boxSizing: 'border-box',
    background: '#f7fafc',
});

export const NoMessage = styled('li')({
    width: '100%',
    listStyleType: 'none',
    color: 'gray',
    textAlign: 'center',
    lineHeight: '100px',
});

export const MessageItem = styled('li')({
    listStyleType: 'none',
    position: 'relative',
    margin: '10px 0',
});

export const MessageTime = styled('span')({
    position: 'absolute',
    right: '4px',
    bottom: '2px',
    fontSize: '12px',
    color: '#7b98ba'
});

export const messageSender = {
    fontSize: '12px',
    fontWeight: 600,
    color: '#4974ad'
};

export const messageText = {
    background: '#e1e8f0',
    padding: '8px',
    borderRadius: '4px',
    paddingRight: '32px',
    wordBreak: 'break-all',
};

export const root = {
    minWidth: '320px',
    maxWidth: '900px',
    maxHeight: '100vh',
    height: '100vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column'
};

export const usernameContainer = {
    padding: '0 8px',
    borderRight: '1px solid gray',
};

export const messageSendButton = {
    background: 'none',
    border: 'none',

    '&:hover': {
        background: 'none',
    }
};
export const messageInput = {
    background: 'none',
    border: 'none',
    width: '100%',
    padding: '10px',

    '&:focus-visible': {
        outline: 'none',
    }
};

export const usernameValue = {
    background: 'none',
    border: 'none',
    width: 'fit-content',
    fontSize: '13px',
};

export const newMessagePanel = {
    width: '100%',
    display: 'flex',
    background: '#bfcdde',
    minHeight: '50px',
};


export const FormNewMessagePanel = styled('form')({
    width: '100%',
    display: 'flex',
    background: '#bfcdde',
    minHeight: '50px',
  });
