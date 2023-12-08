import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';


interface Props{
    changeLangage: (e: any) => void;
}

const SelecteurLangage = ({changeLangage} : Props) => {

  return (
    <div className="self-start p-5">
        <Select
        color="primary"
        placeholder="Veuillez choisir un langage de traduction"
        variant="soft"
        onChange={(e) => changeLangage(e)}
      >
        <Option value="english">Anglais</Option>
        <Option value="french">Francais</Option>
        <Option value="turkish">Turque</Option>
        <Option value="chinese">Chinois</Option>
        <Option value="spanish">Espagnol</Option>
        <Option value="russian">Russe</Option>
        <Option value="german">Allemand</Option>
      </Select>
      </div>
  );
};

export default SelecteurLangage;
