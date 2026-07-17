# Portfolio validation

Run validation from the repository root while checked out on `portfolio-tool`:

```sh
sh script/validate_portfolio
```

The command is non-destructive. It refuses to run on another branch, checks the
canonical project collection in `source/_projects`, and sends Jekyll output to a
temporary directory that is removed when validation finishes.

The collection check reports:

- duplicate or missing project order values;
- missing thumbnail metadata;
- missing image, video, poster, thumbnail, and hero files;
- filename-case mismatches;
- missing or case-mismatched root-relative paths in active templates;
- duplicate project categories;
- categories not represented in the active category navigation.

It also flags the active malformed project-card link and nested `main` landmarks
until those interface issues are corrected.

The command exits nonzero when a collection error occurs or Jekyll cannot build.
Unknown categories are warnings until the browser introduces a canonical category
registry.
