function HeaderOnly({ children }) {
  return (
    <div>
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default HeaderOnly;
