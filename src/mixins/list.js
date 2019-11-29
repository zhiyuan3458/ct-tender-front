export default {
  data () {
    return {
      pageNum: 1,
      pageSize: 20,
      total: 0,
      /* 排序字段 */
      sort: '',
      /* 排序顺序 */
      direction: ''
    };
  },
  methods: {
    /**
     * @description 点击当前页触发
     * @author lvzhiyuan
     * @date 2019/9/24
     */
    handleCurrentChange (value) {
      this.pageNum = value;
      this.getList();
    },
    /**
     * @description 点击每页显示多少条触发
     * @author lvzhiyuan
     * @date 2019/9/24
     */
    handleSizeChange (value) {
      this.pageSize = value;
      this.getList();
    },
    /**
     * @description 排序
     * @author lvzhiyuan
     * @date 2019/9/17
     */
    handleSort ({ column, prop, direction }) {
      this.sort = prop;
      this.direction = direction;
      this.getList();
    }
  }
};
