# Backend for Frontend GraphQL Gateway Boilerplate

## Folder Structure
```
├── README.md
├── apis                      # Project proto & 3rd party proto
│   ├── blankhat
│   └── vendor
├── docker-compose.yml
├── gateway                   # BFF Gateway
│   ├── __generated__
│   ├── __tests__
│   ├── context
│   ├── datasources
│   ├── errors
│   ├── lib
│   ├── loaders
│   ├── middlewares
│   ├── schema
│   └── utils
├── package-lock.json
├── package.json
├── packages                  # Generated packages
│   └── apis
├── script                    # Generate Javascript code
│   ├── api-codegen
│   └── protocw
├── services                  # BE services
│   └── helloworld
└── tmp                       # Executable protoc
    ├── protobuf-javascript
    └── protoc
```
