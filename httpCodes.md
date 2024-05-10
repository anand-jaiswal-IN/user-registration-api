Here's a list of some common HTTP status codes along with their meanings:

1. **1xx Informational**:
   - **100 Continue**: The server has received the initial part of the request and is still processing it.

2. **2xx Success**:
   - **200 OK**: The request was successful.
   - **201 Created**: The request has been fulfilled and a new resource has been created.
   - **204 No Content**: The server successfully processed the request but is not returning any content.

3. **3xx Redirection**:
   - **301 Moved Permanently**: The requested resource has been permanently moved to a new URL.
   - **302 Found (Moved Temporarily)**: The requested resource has been temporarily moved to a different URL.
   - **304 Not Modified**: The client's cached version of the requested resource is still valid.

4. **4xx Client Error**:
   - **400 Bad Request**: The server could not understand the request due to invalid syntax.
   - **401 Unauthorized**: The request requires user authentication.
   - **403 Forbidden**: The server understood the request but refuses to authorize it.
   - **404 Not Found**: The requested resource could not be found on the server.
   - **406 Not Acceptable** : This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content that conforms to the criteria given by the user agent.
   - **409 Conflict** : This response is sent when a request conflicts with the current state of the server.

5. **5xx Server Error**:
   - **500 Internal Server Error**: A generic error message indicating that the server encountered an unexpected condition.
   - **502 Bad Gateway**: The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed.
   - **503 Service Unavailable**: The server is currently unable to handle the request due to temporary overloading or maintenance of the server.
   - **504 Gateway Timeout**: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.

These are some of the most commonly encountered HTTP status codes, but there are many others defined in the HTTP specification for various purposes.