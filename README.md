# AttestGate demo app

A tiny HTTP service for exercising the AttestGate workflow from GitHub Actions through Kubernetes admission.

## Run locally

    docker build -t attestgate-demo .
    docker run --rm -p 3000:3000 attestgate-demo

Open http://localhost:3000; health check: http://localhost:3000/healthz.

## Configure the AttestGate demo

1. In AttestGate, create a CI integration for:
   - Repository: OP-Prajwal/demo_test
   - Workflow file: .github/workflows/attestgate.yml
   - Protected branch: main
   - Image repository: ghcr.io/op-prajwal/demo-test
2. Copy the one-time token into the GitHub repository secret ATTESTGATE_TOKEN.
3. Add the integration ID as the repository variable ATTESTGATE_INTEGRATION_ID.
4. Ensure GitHub Actions can write packages for the repository. The workflow publishes the package to GHCR.
5. Push to main or re-run the workflow. When the integration ID and token are present, it signs the image, creates an SPDX SBOM attestation and signed provenance, then submits the image digest to AttestGate.

The workflow uses keyless Cosign signing through GitHub Actions OIDC. It only runs for pushes to main and manual runs from that branch. Do not add the CI token to source files.

After the first GHCR push, set the demo package visibility to public if the Kubernetes cluster will pull it without registry credentials.
