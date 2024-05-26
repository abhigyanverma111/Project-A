export default function ChatPage({ items, style }) {
  return (
    <div style={style}>
      <ul>
        {items.map((item, index) => {
          <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
