import { render, screen ,fireEvent,} from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('フォームが正しく表示され、送信ができるかテストする', async () => {
  // アプリケーションをレンダリング
  render(<App />);

  // フォームの要素を取得
  const nameInput = screen.getByLabelText(/お名前/i);
  const languageSelect = screen.getByLabelText(/お好きな言語は何ですか？/i);
  const idInput = screen.getByLabelText(/ID/i);
  const submitButton = screen.getByText(/回答する/i);

  // フォームに値を入力
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(languageSelect, { target: { value: 'javascript' } });
  fireEvent.change(idInput, { target: { value: '123' } });

  // デバッグ用：レンダリングされたDOMの表示
  // eslint-disable-next-line testing-library/no-debugging-utils

  // フォームを送信
  fireEvent.click(submitButton);

  // サーバーからの応答を待つ（非同期処理）
  await screen.findByText(/アンケートが送信されました/i);

  // 成功メッセージが表示されたことを確認
  expect(screen.getByText(/アンケートが送信されました/i)).toBeInTheDocument();
});
