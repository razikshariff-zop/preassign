import { Component } from "react";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      page: 1,
      itemsPerPage: 5, 
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setTimeout(() => {
      this.setState({ products: data, loading: false });
    }, 3000); 
    } catch (err) {
      console.error("Error fetching products:", err);
      this.setState({ loading: false });
    }
  };

  nextPage = () => {
    const totalPages = Math.ceil(this.state.products.length / this.state.itemsPerPage);
    if (this.state.page < totalPages) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  prevPage = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  render() {
    const { products, loading, page, itemsPerPage } = this.state;

    if (loading) return <p>Loading products...</p>;

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return (
      <>
      <div>
        <h2>Products (Page {page})</h2>
        <ul>
          {currentProducts.map((p) => (
            <li key={p.id}>
              {p.title} - ${p.price}
            </li>
          ))}
        </ul>
        <button onClick={this.prevPage} disabled={page === 1}>
          Prev
        </button>
        <button onClick={this.nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
      <BlogPosts/>
      </>
    );
  }
}

export default ProductList;

class BlogPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],      // list of posts
      loading: true,  // loading state
      error: null     // error state
    };
  }

  componentDidMount() {
    // Simulated API call (replace with real headless CMS endpoint)
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => this.setState({ posts: data, loading: false }))
      .catch((err) => this.setState({ error: err.message, loading: false }));
  }

  render() {
    const { posts, loading, error } = this.state;

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div>
        <h2>Latest Blog Posts</h2>
        {posts.map((post) => (
          <div key={post.id} style={{ borderBottom: "1px solid #c52f2fff", padding: "10px 0" }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}


