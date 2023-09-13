# XYZ Project 🌟

 This is an open-source backend service written in Rust 🦀.

This service utilizes technologies such as ScyllaDB, Tokio, and Warp.

## Prerequisites 🛠️

Before you proceed, make sure you have the following software installed on your machine:

- [Docker Desktop](https://www.docker.com/products/docker-desktop) 🐳
- [Cargo (Rust package manager)](https://rust-lang.org/tools/install) 📦

## Setup Steps 👩‍💻👨‍💻

Follow the steps below to get the project up and running:

### Clone the Repository 📂
```bash
git@github.com:xyz-hq/xyz.git

cd xyz
```


### Start ScyllaDB with Docker 🐳

Since the `docker-compose.yml` file is located in the base directory, you can run it from there:

```bash
docker-compose up -d
```

Please verify your scylla db is up and running on localhost:9042 in your docker container.

### Run the Application 🚀

CD into the `julia` directory to run the Rust application:

```bash
cd julia
cargo build
cargo run
```

## Resources 📖

- For handling queries and results in ScyllaDB, the [Scylla Rust Driver Documentation](https://rust-driver.docs.scylladb.com/stable/queries/result.html) is the go-to resource 📚.
- We utilize various Rust crates from [Crates.io](https://crates.io/) 📦.
- The asynchronous programming is achieved using [Tokio](https://tokio.rs/) 🚀.
- [Warp](https://github.com/seanmonstar/warp) is used for route handling and filtering 🌐.

## Contributing 🤝
Feel free to contribute to this project by creating issues, sending pull requests, or simply spreading the word 🗨️.

## License 📄
XYZ is open-source software licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/) 📝.
