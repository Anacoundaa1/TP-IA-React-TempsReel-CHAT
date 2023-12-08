import Button from "@mui/joy/Button";
import { IMessage } from "../Message";



interface Props{
    suggestionContent: any;
    lastMessage: any,
    username: string,
    changeInput: (e: any) => void; 
}

const Suggestion = ({suggestionContent, lastMessage, username, changeInput} : Props) => {

  return (
    <div >
       {(
        suggestionContent !== null && suggestionContent?.suggestion1  && lastMessage?.username !== username ?  <div className="flex gap-2 justify-end">
        <Button
      className="mb-2"
      size="md"
      variant="outlined"
      type="submit"
      onClick={(e) => changeInput(e)}
    >
      {suggestionContent?.suggestion1}
    </Button>
    <Button
      className="mb-2"
      size="md"
      variant="outlined"
      type="submit"
      onClick={changeInput}
    >
      {suggestionContent?.suggestion2}
    </Button>
    <Button
      className="mb-2"
      size="md"
      variant="outlined"
      type="submit"
      onClick={changeInput}
    >
      {suggestionContent?.suggestion3}
    </Button>
        </div>
     : ""
      )}
    </div>
  );
};

export default Suggestion;
