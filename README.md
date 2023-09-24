## _xyz is an asynchronous chat and web service_


![arch.png](..%2Farch.png)



<a href="https://discord.gg/gt8VTZfn6h" target="_blank">
    <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord" alt="Join our Discord" width="300"/>
</a>
<br />
<br />

### What you need 
- [Docker Desktop](https://www.docker.com/products/docker-desktop) 🐳
- [Cargo (Rust package manager)](https://rust-lang.org/tools/install) 📦

### Clone our project 
Follow the steps below to get the project up and running:
```bash
git clone git@github.com:xyz-hq/xyz.git

cd xyz
```
### Start container 🐳
Since the `docker-compose.yml` file is located in the base directory, you can run it from there:
```bash
docker-compose up --build
```
Please verify Scylla DB is up and running on localhost:9042 in your docker container.

### Run a service  🚀
CD into the `julia` directory to run the server:

```bash
cd julia
cargo build
cargo run
```

## Resources 📖
- [The Scylla Rust doc](https://rust-driver.docs.scylladb.com/stable/queries/result.html).and([the CQL doc](https://cassandra.apache.org/doc/latest/cassandra/cql/index.html))
- [Tokio](https://github.com/tokio-rs/tokio#readme)
- [Warp](https://github.com/seanmonstar/warp)

