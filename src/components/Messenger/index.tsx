import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { mainActions } from '../../actions';
import { AppState } from '../../reducers';
import { 
    getMainUsername,
    getMainMessagesList,
} from '../../selectors/mainSelector';
import { MessagesList } from '../../types';
import { Input, Box, IconButton } from '@mui/material';
import { 
    MessageTime, 
    MessageItem, 
    MessageList, 
    NoMessage, 
    SendImage, 
    UsernameLabel, 
    FormNewMessagePanel 
} from './styles';
import * as sx from './styles';

export interface Props {
    username: string
    messages: MessagesList

    getMessagesList: Function
    sendMessage: Function
    setUserName: Function
}

const mapStateToProps = (state: AppState) => ({
    messages: getMainMessagesList(state),
    username: getMainUsername(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getMessagesList: () => dispatch(mainActions.mainMessagesListFetch()),
    sendMessage: (messageText: string) => dispatch(mainActions.mainSendMessage(messageText)),
    setUserName: (username: string) => dispatch(mainActions.mainSetUserName(username)),
});

const Home = (props: Props) => {
    const {
        username,
        messages,
        getMessagesList,
        sendMessage,
        setUserName,
    } = props;
    const [messageText, setmessageText] = React.useState('');

    const bottomRef = useRef(null);

    React.useEffect(() => {
        getMessagesList();
    }, []);

    React.useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <Box component="div" sx={sx.root}>
            <MessageList>
            {
                    messages === null
                        ? <NoMessage >Загрузка...</NoMessage>
                        : null
                }
                {
                    messages !== null && !messages.length
                        ? <NoMessage >Нет сообщений</NoMessage>
                        : null
                }
                {
                    !Array.isArray(messages) && messages !== null
                        ? <NoMessage >Что-то пошло не так...</NoMessage>
                        : null
                }
                {
                    messages !== null && messages.length 
                        ? messages.map((message,key) =>
                        <MessageItem key={key}>
                                <Box component="div" sx={sx.messageText}>
                                    <Box component="div" sx={sx.messageSender}>
                                        {message.sender}
                                    </Box>
                                    {message.text}
                                </Box>
                                <MessageTime>
                                    {message.time}
                                </MessageTime>
                        </MessageItem>
                        )                        
                        : null
                }
                <div id="bottom-reference" ref={bottomRef} />
            </MessageList>
            <FormNewMessagePanel >
                <Box sx={sx.usernameContainer}>
                    <UsernameLabel
                        htmlFor="username"
                    >
                        Ваше имя:
                    </UsernameLabel>
                    <Input
                        type='text'
                        name="username"
                        value={username}
                        sx={sx.usernameValue}
                        disableUnderline
                        onChange={(event) => {
                            setUserName(event.target.value);
                        }}
                    />
                </Box>
                <Input 
                    type='text'
                    sx={sx.messageInput}
                    disableUnderline
                    autoFocus
                    value={messageText}
                    placeholder="Введите сообщение"

                    onChange={(event) => {
                        setmessageText(event.target.value);
                    }}

                    onKeyDown={(event) => {
                        if (messageText && event.key === 'Enter') {
                            sendMessage(messageText);
                            setmessageText('');
                        }
                    }}
                />
                <IconButton sx={sx.messageSendButton}
                    type='submit'
                    onClick={(event) => {
                        event.preventDefault();
                        if (messageText) {
                            sendMessage(messageText);
                            setmessageText('');
                        }
                    }}
                >
                    <SendImage
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADe0lEQVR4nO3bTahVVRQH8J8v6z0ry6KIPknySTUoSKIIIwJHhTRIaVDpLGyUM6EEkz5oFjWLRtnMaiQ0eSF9YkWkFGQEFYXSJ0WKPS2ft8G6l32M+/x47+x9jp77hzu55+y9/nvdvdde/7X3ZYQRRhhhBDvxNTbi4oa5NIIv0Ot/DuBlTDbKqDDukxww+BzDFFZjQXPUyuFtMfD38Sr+lpzxFTbggsbYFcCN+AczWCFiwRP4QXLEX3gJ1zfEMTteFAP9QJr2Y2IZTEmOmMEOrGqAY1Yswa9ikGuGPL8Nr2BacsZuPIZFhThmxwYxsB9x/izvXIFN2Cc54he8gGsLcMyKc7BHDOqpk7x7HtZil+SII9iOuzJyzI57xWAO4bpTbLMC2/Cv5IzPsA7nZuCYHW+KQWw7zXZX4mn8Ljnip/53l9VJMDeWimB3DCvn0H5c/PpfSo44LBx6S00cs+M5aSqPzaOflSIuHJWc8aGIHwvnyTErLsR+QfjRGvq7QewUf0qO+FbsKJfW0H8WrJPW8UU19blY5A57JUccFDnGzTXZqA0L8LEg+WzNfY+JbHKHiDWtFWF3CmKHsSyTjeVCZxySZsU3Qo+0QoS9Lki9kdlOa0XY1WKd9pQRQa0UYZv7RPaIlLkUWiPCFuH7PoEtmChpXGSZW/Gz40XY1v6zIlhbMf6HqB+WzuzGsR6fV7gcEXHq9hIEHsanFeM9fCKm5OISBCq4W+iWapb5ER5SQITdJDK73yrGp0Xau0rZfbxRETYulsaUlND0xFnDJlyem8D/uDQqwpYJr1f38UGRZLWyu0ejImwhHhD7dpXAu7kND8GkCNYHKjzeY34Sd67oNWBzGLLxmNTBJTBbENyrfBCcUDAItmkbvErBbbDTidCaiqHOpcITOi6GBnJ4tw7K4WpB5J4C9lpXEBmUxLZnttPKktigKDqdkURri6LVsvgzNfc9rCw+o2Vl8fWC2D5xUlQHzpiDkerR2CM19Heio7FLaui/djwvSO4yv+l4Rh6OVo/H75hD+6KiJAfeEqRfO812RUVJLgyuyBwUAzoVnDVXZKqXpJ48ybtn5SWpx8VAvjO72DnRNblrCnDMhiVScePBIc9bIUpyYnBVdmflu9aJklwYXJY+ilu1VJTkRKevy9/v+PpeK0VJTnT+LzPv6PifpkYYYYQROon/AMqXkYAs2UHIAAAAAElFTkSuQmCC"
                    />
                </IconButton>
            </FormNewMessagePanel>
        </Box>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
