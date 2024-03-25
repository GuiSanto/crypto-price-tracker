import { Combobox } from '@/components/ui/combobox';
import useAllCryptosList from '@/hooks/useAllCryptosList';

export type CryptoComboBoxProps = {
  addCryptoById: (value: string) => void;
};

const CryptoComboBox = (props: CryptoComboBoxProps) => {
  const { data: cryptoList } = useAllCryptosList();

  return (
    <div className="flex items-center gap-4">
      <label className="text-lg font-bold">Add Crypto</label>
      <Combobox
        items={
          cryptoList?.map(({ id, name }) => ({ label: name, value: id })) ?? []
        }
        itemSelected={props.addCryptoById}
      />
    </div>
  );
};

export default CryptoComboBox;
