# 上传到 GitHub

当前机器没有安装 `gh` 命令，GitHub 插件也没有可写目标仓库，所以需要先创建一个空仓库。

## 方式一：你创建空仓库后让我继续

1. 在 GitHub 创建一个空仓库，建议名称：`risklens-cn`。
2. 不要勾选自动生成 README、License 或 `.gitignore`。
3. 把仓库地址发回来，例如：`yourname/risklens-cn`。
4. 我继续把本目录文件上传到该仓库。

## 方式二：你本机手动上传

在本目录执行：

```bash
git init
git add .
git commit -m "Initial release of RiskLens CN"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/risklens-cn.git
git push -u origin main
```

## 发布 zip 包

```bash
bash scripts/package.sh
```

生成文件：

```text
dist/risklens-cn-free.zip
```

可以把 zip 上传到 GitHub Release，或作为免费版下载包。
