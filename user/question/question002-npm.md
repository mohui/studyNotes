
# npm 和 yarn

## 安装速度：
> yarn 使用并行下载，相对于 npm 在安装依赖包时更快一些。

## 缓存：
> yarn 使用全局缓存目录，因此多个项目可以共享相同的依赖包，减少了重复下载的次数。

## 安全性：
> yarn 在安装依赖时会生成一个 yarn.lock 文件，
> 锁定了依赖的版本号，确保了依赖版本的一致性。
> npm 也可以使用 package-lock.json 来实现类似的功能。

## 用户界面：
> yarn 在终端中的输出更加美观和易于阅读。

# mpm 和 yarn 的优缺点

## npm 的优点：

### 默认的包管理器：
>npm 是 Node.js 的官方包管理工具，作为 Node.js 的一部分，无需单独安装，直接可用。

### 大规模的包仓库：
> npm 有一个庞大的包仓库，包含了数以百万计的 JavaScript 包，开发者可以方便地找到所需的包。

### 活跃的生态系统：
> npm 生态系统非常活跃，社区贡献丰富，更新和维护非常及时。

### 适合大多数项目：
> 对于绝大多数 JavaScript 项目，npm 已经足够满足需求。

## npm 的缺点：

###  性能
> 在安装依赖包时，npm 是逐个顺序地下载，可能导致安装时间较长。

### 不稳定
> 在过去，npm 的版本有时会导致依赖冲突或安装失败的问题，
> 虽然现在版本更稳定， 但偶尔仍可能出现问题。

### 不支持并行安装
> npm 默认情况下是逐个下载包，无法并行下载多个包，可能导致速度较慢。

## yarn 的优点：

### 并行安装
> yarn 使用并行下载，相比 npm 在安装依赖包时更快一些。

### 锁定版本
> yarn 会生成一个 yarn.lock 文件，锁定依赖的版本号，确保了依赖版本的一致性。

### 缓存
> yarn 使用全局缓存目录，多个项目可以共享相同的依赖包，
> 减少了重复下载的次数， 节省网络流量和时间。

### 用户界面
> yarn 在终端中的输出更加美观和易于阅读，提供更好的用户体验。

## yarn 的缺点：

###  安全问题
> 由于使用了全局缓存，有时可能会出现缓存过期或冲突的问题，需要及时清理缓存。

### 依赖关系
>有时 yarn 可能会引入与 npm 略有不同的依赖解析策略，导致依赖关系的微小差异。