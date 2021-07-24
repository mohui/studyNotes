### main.js文件
```javascript
import KnAreaCascader from './components/kn-area-cascader';
(async () => {
  Vue.component('kn-area-cascader', KnAreaCascader);
})();
```
### person list 下拉框应用
```vue
<kn-area-cascader
    style="width: 100%"
    :code="queryForm.region"
    :hospital="queryForm.hospital"
    @outValue="
      value => {
        queryForm.region = value.regionId;
        queryForm.hospital = value.hospitalId;
      }
    "
></kn-area-cascader>
```

### 组件应用 ui/web/components
```vue
<template>
  <el-popover ref="pop" placement="bottom" width="300" trigger="click">
    <el-form label-width="60px">
      <el-form-item label="地区">
        <el-cascader
          ref="areaCascader"
          v-model="regionId"
          style="width: 100%"
          :placeholder="placeholderArea || '请选择地区'"
          :props="areaOptions"
          collapse-tags
          filterable
          clearable
          size="mini"
          :disabled="!$settings.user.isRegion"
          @change="handleChange()"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="机构">
        <el-cascader
          ref="hospitalCascader"
          v-model="hospitalId"
          style="width: 100%"
          :placeholder="placeholderHospital || '请选择机构'"
          :props="hospitalOptions"
          collapse-tags
          filterable
          clearable
          size="mini"
          @change="handleChange()"
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="click()">确定</el-button>
        <el-button size="mini" @click="$refs.pop.showPopper = false"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
    <el-input
      slot="reference"
      :placeholder="placeholderInputText || '请选择'"
      style="width:100%"
    ></el-input>
  </el-popover>
</template>

<script>
export default {
  name: 'kn-area-cascader',
  props: {
    code: {
      type: String
    },
    hospital: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      regionId: this.code || this.$settings.user.regionId,
      hospitalId: this.hospital || '',
      areaOptions: {
        lazy: true,
        emitPath: false,
        checkStrictly: true,
        lazyLoad: async (node, resolve) => {
          const {value = this.$settings.user.regionId, data} = node;
          resolve(
            (await this.$api.Region.list(value)).map(it => ({
              label: it.name,
              value: it.code,
              level: it.level,
              leaf: data?.level >= 4
            }))
          );
        }
      },
      hospitalOptions: {
        lazy: true,
        emitPath: false,
        checkStrictly: true,
        lazyLoad: async (node, resolve) => {
          const {level, value = this.regionId, data} = node;
          if (!value) {
            resolve([
              {
                value: '',
                label: '请先选择所属地区',
                disabled: true,
                leaf: true
              }
            ]);
            return;
          }
          resolve(
            (level === 0
              ? await this.$api.Region.listHospital(value)
              : await this.$api.Hospital.list(value)
            ).map(it => ({
              value: it.code || it.id,
              label: it.name,
              level: it?.region?.level,
              leaf: data?.level >= 4 || level >= 3
            }))
          );
        }
      }
    };
  },
  watch: {
    regionId() {
      //清掉一波placeholder
      this.placeholderHospital = '';
      this.placeholderArea = '';
      //重新加载lazyLoad
      if (this.regionId) this.$refs['hospitalCascader']?.panel?.lazyLoad();
      if (!this.regionId) {
        this.placeholderArea = '';
        this.regionId = this.$settings.user.regionId;
      }
      //code更变后清除机构的所选
      this.$refs['hospitalCascader']?.panel?.clearCheckedNodes();
    },
    hospitalId() {
      //hospitalId===''时清除机构的placeholder
      if (!this.hospitalId) this.placeholderHospital = '';
    }
  },
  asyncComputed: {
    placeholderArea: {
      async get() {
        if (!this.code)
          //若父组件的code为空了,则要清除所选
          this.$refs['areaCascader']?.panel?.clearCheckedNodes();
        if (this.code) return (await this.$api.Region.info(this.code))?.name;
        return '';
      },
      default: ''
    },
    placeholderHospital: {
      async get() {
        if (!this.hospital)
          //若父组件的hospital为空了,则要清除所选
          this.$refs['hospitalCascader']?.panel?.clearCheckedNodes();
        if (this.hospital)
          return (await this.$api.Hospital.info(this.hospital))?.name;
        return '';
      },
      default: ''
    }
  },
  computed: {
    placeholderInputText() {
      return this.placeholderHospital || this.placeholderArea || '';
    }
  },
  methods: {
    click() {
      this.$emit('outValue', {
        regionId: this.regionId,
        hospitalId: this.hospitalId
      });
      this.$refs.pop.showPopper = false;
    },
    handleChange() {
      this.$refs['areaCascader'].toggleDropDownVisible(false);
      this.$refs['hospitalCascader'].toggleDropDownVisible(false);
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
</style>

```
```javascript
export default class Region {

  @validate(should.string().description('通过code查询区域下的机构'))
  async listHospital(code) {
    return await HospitalModel.findAll({
      attributes: {
        exclude: ['deleted_at']
      },
      where: {region: code},
      paranoid: false,
      include: {
        model: RegionModel,
        paranoid: false,
        attributes: {
          exclude: ['deleted_at']
        }
      }
    });
  }
}
```

```javascript
export default class Person {
  @validate(
    should.object({
      hospital: should
        .string()
        .required()
        .allow('', null),
      include: should.boolean().description('是否包含查询下级机构的个人档案')
    })
  )
  async list(params) {
    const {
      pageSize,
      pageNo,
      hospital,
      region,
      idCard,
      tags,
      include,
      personOr = false,
      documentOr = false,
      year = dayjs().year()
    } = params;
    const limit = pageSize;
    const offset = (pageNo - 1 ?? 0) * limit;
    const his = '340203';
    let {name} = params;
    if (name) name = `%${name}%`;
    let hospitals = [];
    //没有选机构和地区,则默认查询当前用户所拥有的机构
    if (!region && !hospital)
      hospitals = Context.current.user.hospitals.map(it => it.id);
    //仅有地区,则查询该地区下的所有机构
    if (region && !hospital) {
      const children = await getLeaves(region);
      hospitals = (
        await HospitalModel.findAll({
          where: {
            id: {
              [Op.in]: children
                .map(it => it.code)
                //TODO: 苟且区分一下地区和机构
                .filter(it => it.length === 36)
            }
          }
        })
      )
        .map(it => it.toJSON())
        .map(it => it.id);
    }
    if (hospital) hospitals = [hospital];

    //如果查询出来的机构列表为空,则数据都为空
    if (hospitals.length === 0) return {count: 0, rows: []};
    // language=PostgreSQL
    hospitals = (
      await Promise.all(
        hospitals.map(it =>
          appDB.execute(
            `select hishospid as id from hospital_mapping where h_id = ?`,
            it
          )
        )
      )
    )
      .filter(it => it.length > 0)
      .reduce(
        (result, current) => [...result, ...current.map(it => it.id)],
        []
      );
    if (include && hospital)
      hospitals = (
        await Promise.all(
          hospitals.map(item =>
            //查询机构的下属机构
            originalDB.execute(
              `select hospid as id from view_hospital where hos_hospid = ?`,
              item
            )
          )
        )
      )
        .filter(it => it.length > 0)
        .reduce(
          (result, current) => [...result, ...current.map(it => it.id)],
          []
        )
        .concat(hospitals);

    const sqlRenderResult = listRender({
      his,
      name,
      hospitals,
      idCard,
      ...tags,
      personOr,
      documentOr,
      year
    });
    const count = (
      await originalDB.execute(
        `select count(1) as count ${sqlRenderResult[0]}`,
        ...sqlRenderResult[1]
      )
    )[0].count;
    const person = await originalDB.execute(
      `select vp.personnum   as id,
                vp.name,
                vp.idcardno    as "idCard",
                vp.address     as "address",
                vp.sex         as "gender",
                vp.phone       as "phone",
                mp."S03",
                mp."S23",
                mp."O00",
                mp."O02",
                mp."H00",
                mp."H01",
                mp."H02",
                mp."D00",
                mp."D01",
                mp."D02",
                mp."C01",
                mp."C02",
                mp."C03",
                mp."C04",
                mp."C05",
                mp."C00",
                mp."C06",
                mp."C07",
                mp."C08",
                mp."C09",
                mp."C10",
                mp."C11",
                mp."C13",
                mp."C14",
                mp."E00",
                mp.ai_2dm,
                mp.ai_hua,
                mp.year,
                vh.hospname    as "hospitalName",
                vp.operatetime as date
         ${sqlRenderResult[0]}
         order by vp.operatetime desc, vp.personnum desc
         limit ? offset ?`,
      ...sqlRenderResult[1],
      limit,
      offset
    );

    return {
      count: Number(count),
      rows: person
    };
  }
}
```

