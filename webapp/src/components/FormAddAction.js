import React from 'react';
import { Card, Form, Input, Select, Image } from 'semantic-ui-react';
import { ButtonPrimary } from '../styles/Button';

function FormAddAction() {
  const cryptoOptions = [
    { key: '', value: '', text: 'Choose your crypto' },
    {
      key: 'btc',
      value: 'btc',
      text: (
        <span>
          <Image
            style={{ width: '20px', marginRight: '10px' }}
            src="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"
          />{' '}
          Bitcoin
        </span>
      )
    },
    {
      key: 'eth',
      value: 'eth',
      text: (
        <span>
          <Image
            style={{ width: '20px', marginRight: '10px' }}
            src="https://dynamic-assets.coinbase.com/7796fb1bd5752a156c77e0b1fa28fb17e93d03b4b8e2dcff58dcaf8f99b2e4a3c3af2cd905d5536761c54ac273d62d91a38ef8e5702fa988c37264e7aba36b3b/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png"
          />{' '}
          Ethereum
        </span>
      )
    },
    {
      key: 'ltc',
      value: 'ltc',
      text: (
        <span>
          <Image
            style={{ width: '20px', marginRight: '10px' }}
            src="https://dynamic-assets.coinbase.com/f018870b721574ef7f269b9fd91b36042dc05ebed4ae9dcdc340a1bae5b359e8760a8c224bc99466db704d10a3e23cf1f4cd1ff6f647340c4c9c899a9e6595cd/asset_icons/984a4fe2ba5b2c325c06e4c2f3ba3f1c1fef1f157edb3b8ebbfe234340a157a5.png"
          />{' '}
          Litecoin
        </span>
      )
    },
    {
      key: 'xtz',
      value: 'xtz',
      text: (
        <span>
          <Image
            style={{ width: '20px', marginRight: '10px' }}
            src="https://dynamic-assets.coinbase.com/196aae0d1ec13906a21975544fac79eb2752e379a149a1e5c6b7ffe6159986f474c67f929afe61541df773d97d883e638911f125753fd8974d91eca8c1657aff/asset_icons/e294b1cf6ec96713bf6a15e72b13313e446489d7709cda328f825679370b46b9.png"
          />{' '}
          Tezos
        </span>
      )
    }
  ];
  return (
    <Card>
      <Card.Content>
        <Card.Header>Ajouter un achat</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Meta style={{ marginTop: '20px' }}>
          <Form>
            <Form.Field>
              <label>Cryptomonnaie</label>
              <Select placeholder="Cryptomonnaie" options={cryptoOptions} />
            </Form.Field>
            <Form.Field
              label="Montant crypto"
              control={Input}
              placeholder="0.0002"
            ></Form.Field>
            <Form.Field
              label="Montant €"
              control={Input}
              placeholder="10 €"
            ></Form.Field>
            <Form.Field
              label="Prix"
              control={Input}
              placeholder="8123,23 €"
            ></Form.Field>
            <ButtonPrimary type="submit">Ajouter</ButtonPrimary>
          </Form>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}
export default FormAddAction;
