

<!-- cmd+shift+v to preview -->

## **1. Three Places to Attach Middleware in Gin**

1. **Global** — applies to *every* request:

   ```go
   r.Use(GlobalMW)
   ```

2. **Group** — applies to all routes in a specific `Group`:

   ```go
   api := r.Group("/api")
   api.Use(GroupMW)
   ```

3. **Route-specific** — applies to just one handler:

   ```go
   r.GET("/ping", RouteMW, handler)
   ```

**Test routes for the code**
```cmd
http://localhost:8000/api/test
http://localhost:8000/api/
http://localhost:8000/
```