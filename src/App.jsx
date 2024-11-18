import data from "./data.json";
import Note from "./Note";
function App() {
  return (
    <>
      <main>
        <div className="grid_container">
          {data.map((item) => {
            return <Note {...item} key={item.id} />;
          })}
        </div>
      </main>
    </>
  );
}

export default App;
