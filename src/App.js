import "./App.css";
import Dashboard from "./Core/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./Core/User Pages/Users";
import Orders from "./Core/Orders Pages/Orders";
import Categories from "./Core/Category Pages/Categories";
import Products from "./Core/Product Pages/Products";
import Complaints from "./Core/Complaints/Complaints";
import AddProduct from "./Core/Product Pages/AddProduct";
import AddCategory from "./Core/Category Pages/AddCategory";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/users" exact component={Users} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/categories" exact component={Categories} />
          <Route path="/categories/add" exact component={AddCategory} />
          <Route path="/products" exact component={Products} />
          <Route path="/complaints" exact component={Complaints} />
          <Route path="/products/add" exact component={AddProduct} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
