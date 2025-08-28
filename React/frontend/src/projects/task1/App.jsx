
import CounterClass from './CounterClass'
import Counter from './components/Counter'
import ProductList from './components/ProductSearch'
import Userlist from './components/UserList'
import UserProfile from './components/UserProfile'


export default function App() {
  return (
    <div>
        {/* <CounterClass></CounterClass> */}
        <Userlist></Userlist>
        <UserProfile />
        {/* <Counter></Counter> */}
        <ProductList></ProductList>
    </div>
  )
}
