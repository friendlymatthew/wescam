## xyz is an asynchronous chat and web service 
[![IMG_8028.jpg](..%2FIMG_8028.jpg)](https://discord.gg/gt8VTZfn6h)
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

