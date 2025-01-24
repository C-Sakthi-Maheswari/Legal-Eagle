import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Legal Eagle</h1>
        <p>Your trusted assistant for legal and historical document processing</p>
      </header>

      <main className="App-main">
        <div className="options">
          <div className="option-card">
            <h2>Text Recognition & Simplification</h2>
            <p>Recognize and simplify complex legal documents with ease.</p>
          </div>
          <div className="option-card">
            <h2>Voice Recognition & Translation</h2>
            <p>Convert spoken words into text and translate legal content.</p>
          </div>
          <div className="option-card">
            <h2>Read Old Handwritten Manuscripts</h2>
            <p>Transform traditional handwritten manuscripts into legible and accessible texts.</p>
          </div>
          <div className="option-card">
            <h2>Women Safety Law & Order</h2>
            <p>Access essential laws and resources for women’s safety.</p>
          </div>
        </div>
      </main>

      
    </div>
  );
}

export default App;
