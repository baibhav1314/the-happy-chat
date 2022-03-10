import logo from "./logo.svg";
import "./App.css";

function App() {
    const [{ user }, dispatch] = useStateValue();
    return (
        <div className="app">
            {!user ? (
                // <Login />
                <h1>hi</h1>
            ) : (
                <div className="app_body">
                    <Router>
                        <Sidebar />
                        <Switch>
                            <Route path="/rooms/:roomId">
                                <Chat />
                            </Route>
                            <Route path="/">
                                <Chat />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            )}
        </div>
    );
}

export default App;
