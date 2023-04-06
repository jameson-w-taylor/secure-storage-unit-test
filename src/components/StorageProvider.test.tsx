import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StorageProvider, useStorage } from '../components/StorageProvider';
import { SQLite } from '@ionic-enterprise/secure-storage';

jest.mock('@ionic-enterprise/secure-storage');

const MockConsumer: React.FC = () => {
  const { openDatabase } = useStorage();
  return <button onClick={openDatabase}>Open Database</button>;
};

const ComponentTree = (
  <StorageProvider>
    <MockConsumer />
  </StorageProvider>
);

describe('<StorageProvider />', () => {
  it('Opens a database when told to', async () => {
    const { getByText } = render(ComponentTree);
    const spy = jest.spyOn(SQLite, 'create');
    await userEvent.click(getByText('Open Database'));
    expect(spy).toBeCalled();
  });
});