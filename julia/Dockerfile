# Use the minimal Debian base image
FROM debian:buster-slim AS builder

# Install Rust and other dependencies
RUN apt-get update && apt-get install -y curl build-essential
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Copy your Rust project into the image
WORKDIR /usr/src/julia
COPY ./ ./

# Build the project
RUN rustup default 1.68.2
RUN cargo build --release

# Start a new, smaller image for the final product
FROM debian:buster-slim

# Copy the built executable from the builder stage
COPY --from=builder /usr/src/julia/target/release/julia /usr/local/bin/julia

# Expose port 8080
EXPOSE 8080

# Specify an environment variable
ENV SCYLLA_URI=scylla:9042


# Set the entry point of the container to your binary
CMD ["julia"]