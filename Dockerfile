#设置继承基础镜像
FROM nginx:1.17.1-alpine-perl
#创建者的基本信息
MAINTAINER lzy
#把相关文件放进去docker容器
ADD dist /html/dist/
#ADD guizhoudata /guizhoudata/
#ADD bpm /bpm/
#使用自定义配置文件
ADD nginx.conf /etc/nginx/nginx.conf
#映射端口
EXPOSE 8086
#定义输出命令
CMD ["nginx", "-g", "daemon off;","-c","/etc/nginx/nginx.conf"]
