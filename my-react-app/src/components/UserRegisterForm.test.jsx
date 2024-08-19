import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserRegisterForm from './UserRegisterForm';

describe('UserRegisterFormバリデーションテスト', () => {
  test('ユーザーIDが空白の場合、エラーメッセージが表示されること', () => {
    render(<UserRegisterForm />);
    
    

    fireEvent.change(screen.getByLabelText(/ユーザーID:/i), { target: { value: ' ' } });
    fireEvent.change(screen.getByLabelText(/ユーザー名:/i), { target: { value: 'ValidUsername' } });
    fireEvent.change(screen.getByLabelText(/パスワード:/i), { target: { value: 'ValidPass123' } });
    
    const submitButton = screen.getByRole('button', { name: /登録/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/ユーザーIDは英数字のみ入力可能です/i)).toBeInTheDocument();
  });

  test('ユーザーIDが全角文字の場合、エラーメッセージが表示されること', () => {
    render(<UserRegisterForm />);
    
    fireEvent.change(screen.getByLabelText(/ユーザーID:/i), { target: { value: 'ユーザーID' } });
    fireEvent.change(screen.getByLabelText(/ユーザー名:/i), { target: { value: 'ValidUsername' } });
    fireEvent.change(screen.getByLabelText(/パスワード:/i), { target: { value: 'ValidPass123' } });
    
    fireEvent.click(screen.getByText(/登録/i));
    
    expect(screen.getByText(/ユーザーIDは英数字のみ入力可能です/i)).toBeInTheDocument();
  });

  test('パスワードが空白の場合、エラーメッセージが表示されること', () => {
    render(<UserRegisterForm />);
    
    fireEvent.change(screen.getByLabelText(/ユーザーID:/i), { target: { value: 'ValidUserId' } });
    fireEvent.change(screen.getByLabelText(/ユーザー名:/i), { target: { value: 'ValidUsername' } });
    fireEvent.change(screen.getByLabelText(/パスワード:/i), { target: { value: '           ' } });
    
    fireEvent.click(screen.getByText(/登録/i));
    
    expect(screen.getByText(/パスワードは英数字のみ入力可能です/i)).toBeInTheDocument();
  });

  test('パスワードが8文字未満の場合、エラーメッセージが表示されること', () => {
    render(<UserRegisterForm />);
    
    fireEvent.change(screen.getByLabelText(/ユーザーID:/i), { target: { value: 'ValidUserId' } });
    fireEvent.change(screen.getByLabelText(/ユーザー名:/i), { target: { value: 'ValidUsername' } });
    fireEvent.change(screen.getByLabelText(/パスワード:/i), { target: { value: 'Short1' } });
    
    fireEvent.click(screen.getByText(/登録/i));
    
    expect(screen.getByText(/パスワードは8文字以上必要です/i)).toBeInTheDocument();
  });

  test('ユーザーIDに記号文字を含む場合、エラーメッセージが表示されること', () => {
    render(<UserRegisterForm />);
    
    fireEvent.change(screen.getByLabelText(/ユーザーID:/i), { target: { value: 'InvalidUser@' } });
    fireEvent.change(screen.getByLabelText(/ユーザー名:/i), { target: { value: 'ValidUsername' } });
    fireEvent.change(screen.getByLabelText(/パスワード:/i), { target: { value: 'ValidPass123' } });
    
    fireEvent.click(screen.getByText(/登録/i));
    
    expect(screen.getByText(/ユーザーIDは英数字のみ入力可能です/i)).toBeInTheDocument();
  });

  test('全角記号がパスワードに含まれる場合、エラーメッセージが表示されること', () => {
    render(<UserRegisterForm />);
    
    fireEvent.change(screen.getByLabelText(/ユーザーID:/i), { target: { value: 'ValidUserId' } });
    fireEvent.change(screen.getByLabelText(/ユーザー名:/i), { target: { value: 'ValidUsername' } });
    fireEvent.change(screen.getByLabelText(/パスワード:/i), { target: { value: 'Validパスワード' } });
    
    fireEvent.click(screen.getByText(/登録/i));
    
    expect(screen.getByText(/パスワードは英数字のみ入力可能です/i)).toBeInTheDocument();
  });

  test('小数点を含むパスワードの場合、エラーメッセージが表示されること', () => {
    render(<UserRegisterForm />);
    
    fireEvent.change(screen.getByLabelText(/ユーザーID:/i), { target: { value: 'ValidUserId' } });
    fireEvent.change(screen.getByLabelText(/ユーザー名:/i), { target: { value: 'ValidUsername' } });
    fireEvent.change(screen.getByLabelText(/パスワード:/i), { target: { value: 'Pass.123' } });
    
    fireEvent.click(screen.getByText(/登録/i));
    
    expect(screen.getByText(/パスワードは英数字のみ入力可能です/i)).toBeInTheDocument();
  });
});
