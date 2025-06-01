import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ModalAddDataComponent from '../../widgets/addData/addDataModal';
import { postData } from '../postData';
import '@testing-library/jest-dom';
vi.mock('../postData', () => ({
  postData: vi.fn().mockImplementation(() => new Promise(res => setTimeout(() => res({}), 1000))),
}));

describe('ModalAddDataComponent', () => {
  test('disables submit button during submission', async () => {
    const setIsMenu = vi.fn();

    render(<ModalAddDataComponent setIsMenu={setIsMenu} />);

    const button = screen.getByRole('button', { name: /загрузить данные/i });

    expect(button).toBeEnabled();

  const requiredFields = [
    { label: /^id/i, value: 1 },
    { label: /^Имя/i, value: 'test' },
    { label: /^Email/i, value: 'test@test.com' },
    { label: /^Телефон/i, value: '123456' },
    { label: /^Возраст/i, value: 25 },
    { label: /^Город/i, value: 'Москва' },
  ];
    for (const label of requiredFields) {
      const input = screen.getByLabelText(label.label, { selector: 'input' });
      fireEvent.change(input, { target: { value: label.value } });
    }

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });

    await waitFor(() => {
      expect(button).toBeEnabled();
    });

    expect(postData).toHaveBeenCalledTimes(1);
  });
});