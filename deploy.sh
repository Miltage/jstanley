npm run build;
git add dist;
git commit -m "Deploy site";
git subtree push --prefix dist origin gh-pages;