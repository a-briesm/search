(function(){
    if(document.getElementById('wow_final_v21')){document.getElementById('wow_final_v21').remove();return;}
    
    var html = `
    <div id="wow_final_v21" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#1a1a27;z-index:999999;color:#eee;font-family:tahoma,Arial;padding:20px;overflow-y:auto;direction:rtl;text-align:right;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:3px solid #27ae60;padding-bottom:10px;">
            <div style="display:flex;align-items:center;gap:15px;">
                <h2 style="color:#27ae60;margin:0;">البحث المتقدم بالمنتجات v21.0 🚀</h2>
                <button id="toggle_filters" style="background:#444;color:#fff;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-weight:bold;">➖ طي الفلاتر</button>
            </div>
            <div style="font-size:15px;">المخزن: <b id="st_total">0</b> | المطابق: <b id="st_match" style="color:#27ae60">0</b></div>
            <button onclick="document.getElementById('wow_final_v21').remove()" style="background:#e74c3c;color:#fff;border:none;padding:8px 25px;border-radius:8px;cursor:pointer;font-weight:bold;">إغلاق X</button>
        </div>

        <div id="filter_container" style="background:#252537;padding:20px;border-radius:15px;margin-bottom:20px;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            <div id="filters_inner">
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;margin-bottom:15px;">
                    <div class="f-group"><label>العلامة التجارية</label><select id="f_brand" class="w-input"><option value="">-- الكل --</option></select></div>
                    <div class="f-group"><label>القسم الرئيسي</label><select id="f_main" class="w-input"><option value="">-- الكل --</option></select></div>
                    <div class="f-group"><label>القسم الفرعي</label><select id="f_sub" class="w-input"><option value="">-- اختر الرئيسي --</option></select></div>
                    <div class="f-group"><label>القسم الفرعي الفرعي</label><select id="f_sub_sub" class="w-input"><option value="">-- اختر الفرعي --</option></select></div>
                </div>
                <div id="dynamic_filters_text" style="margin-bottom:10px;"></div>
                <button id="add_t_btn" style="background:#3498db;color:#fff;border:none;padding:5px 15px;border-radius:5px;cursor:pointer;font-size:12px;margin-bottom:15px;">+ إضافة فلتر نصي</button>
                <div id="dynamic_filters_num" style="margin-bottom:10px;"></div>
                <button id="add_n_btn" style="background:#9b59b6;color:#fff;border:none;padding:5px 15px;border-radius:5px;cursor:pointer;font-size:12px;margin-bottom:15px;">+ إضافة فلتر عددي</button>
                <div style="background:#1a1a27;padding:15px;border-radius:10px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;border:1px solid #27ae60;margin-top:10px;">
                    <label style="color:#27ae60;font-weight:bold;cursor:pointer;"><input type="checkbox" id="m_act"> تفعيل فلاتر الرواج</label>
                    <div id="m_box" style="display:flex;gap:15px;opacity:0.5;pointer-events:none;">
                        <label style="cursor:pointer;"><input type="checkbox" class="t_c" id="cr"> الأعلى تقييماً</label>
                        <label style="cursor:pointer;"><input type="checkbox" class="t_c" id="cs"> الأكثر مبيعاً</label>
                        <label style="cursor:pointer;"><input type="checkbox" class="t_c" id="cp"> الأكثر رواجاً</label>
                        <label style="cursor:pointer;"><input type="checkbox" class="t_c" id="cn"> مضاف حديثاً</label>
                    </div>
                </div>
            </div>
            <div style="margin-top:20px;display:flex;gap:10px;align-items:center;">
                <button id="btn_imp" class="btn-main" style="background:#2196F3;">استيراد 📥</button>
                <button id="btn_sho" class="btn-main" style="background:#27ae60;">إظهار النتائج 🔍</button>
                <button id="btn_move" class="btn-main" style="background:#8e44ad;">نقل القسم 📦</button>
                <button id="btn_xls" class="btn-main" style="background:#f39c12;">تصدير Excel 📊</button>
                <button id="btn_del_selected" class="btn-main" style="background:#c0392b;">حذف المحدد 🗑️</button>
                <button id="btn_reset" class="btn-main" style="background:#fff; color:#000;">تصفير الفلاتر 🔄</button>
            </div>
        </div>

        <div id="move_modal" style="display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#2d2d44;padding:30px;border-radius:20px;z-index:1000001;width:500px;box-shadow:0 0 50px rgba(0,0,0,0.8);border:2px solid #8e44ad;">
            <h3 style="margin-top:0;color:#8e44ad;border-bottom:1px solid #444;padding-bottom:10px;">نقل المنتجات المحددة</h3>
            <div style="display:flex;flex-direction:column;gap:15px;margin-top:20px;">
                <div class="f-group"><label>القسم الرئيسي الجديد</label><select id="m_main" class="w-input"></select></div>
                <div class="f-group"><label>القسم الفرعي الجديد</label><select id="m_sub" class="w-input"><option value="">-- اختر الرئيسي --</option></select></div>
                <div class="f-group"><label>القسم الفرعي الفرعي الجديد</label><select id="m_sub_sub" class="w-input"><option value="">-- اختر الفرعي --</option></select></div>
            </div>
            <div style="margin-top:25px;display:flex;justify-content:flex-end;gap:10px;">
                <button id="cancel_move" style="background:#444;border:none;color:#fff;padding:10px 20px;border-radius:8px;cursor:pointer;">إلغاء</button>
                <button id="confirm_move" style="background:#8e44ad;border:none;color:#fff;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:bold;">بدء النقل الآن</button>
            </div>
        </div>

        <div style="background:#252537;border-radius:15px;overflow:auto;max-height:550px;">
            <table style="width:100%;border-collapse:collapse;text-align:right;font-size:12px;">
                <thead style="background:#2d2d44;position:sticky;top:0;z-index:10;">
                    <tr>
                        <th style="padding:10px;"><input type="checkbox" id="all_chk_master"></th>
                        <th>ت</th><th>الاجراءات</th><th>ID</th><th>الاسم</th><th>سعر واو</th><th>الكمية</th><th>الماركة</th><th>الرئيسي</th><th>الفرعي</th><th>الرائج</th>
                    </tr>
                </thead>
                <tbody id="p_body"></tbody>
            </table>
        </div>
    </div>
    <style>
        .w-input { background:#12121d; color:#fff; border:1px solid #444; padding:8px; border-radius:8px; outline:none; width:100%; }
        .f-group { display:flex; flex-direction:column; gap:5px; }
        .btn-main { border:none; padding:12px 20px; border-radius:8px; cursor:pointer; font-weight:bold; color:#fff; }
        .dyn-row { display:flex; gap:10px; margin-bottom:10px; align-items:center; background:#2d2d44; padding:10px; border-radius:8px; }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    
    if (!window.XLSX) {
        var script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    let allData = [];
    let catsRaw = [];

    // جلب تصنيفات النظام عند التشغيل
    async function fetchSystemCats() {
        const r = await fetch('/admin/product/create');
        const text = await r.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const mainSelect = doc.querySelector('select[name="main_category_id"]');
        catsRaw = Array.from(mainSelect.options).map(opt => ({id: opt.value, name: opt.text})).filter(o => o.id);
        
        document.getElementById('m_main').innerHTML = '<option value="">-- اختر القسم الرئيسي --</option>' + catsRaw.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }

    // طي الفلاتر
    document.getElementById('toggle_filters').onclick = function() {
        let inner = document.getElementById('filters_inner');
        inner.style.display = inner.style.display === "none" ? "block" : "none";
        this.innerText = inner.style.display === "none" ? "➕ فك الفلاتر" : "➖ طي الفلاتر";
    };

    // ميزة نقل القسم - فتح النافذة
    document.getElementById('btn_move').onclick = async function() {
        let checked = document.querySelectorAll('.row-sel:checked');
        if(checked.length === 0) return alert('يرجى تحديد منتجات أولاً');
        await fetchSystemCats();
        document.getElementById('move_modal').style.display = 'block';
    };

    document.getElementById('cancel_move').onclick = () => document.getElementById('move_modal').style.display = 'none';

    // تنفيذ النقل
    document.getElementById('confirm_move').onclick = async function() {
        let m_id = document.getElementById('m_main').value;
        let s_id = document.getElementById('m_sub').value;
        let ss_id = document.getElementById('m_sub_sub').value;
        if(!m_id) return alert('يجب اختيار القسم الرئيسي على الأقل');

        let checked = Array.from(document.querySelectorAll('.row-sel:checked'));
        if(!confirm(`سيتم نقل ${checked.length} منتجات. استمرار؟`)) return;

        this.innerText = 'جاري المعالجة...';
        let token = document.querySelector('input[name="_token"]')?.value;
        let count = 0;

        for(let cb of checked) {
            let id = cb.dataset.id;
            count++;
            this.innerText = `نقل (${count}/${checked.length})`;
            
            // طلب التحديث الصامت
            await fetch(`/admin/product/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `_token=${token}&_method=PUT&main_category_id=${m_id}&sub_category_id=${s_id}&sub_sub_category_id=${ss_id}&status=1`
            });
            cb.closest('tr').style.background = '#1e3a2a';
        }
        
        this.innerText = 'تم بنجاح ✅';
        setTimeout(() => {
            document.getElementById('move_modal').style.display = 'none';
            this.innerText = 'بدء النقل الآن';
            alert('تم نقل جميع المنتجات المحددة بنجاح');
        }, 1000);
    };

    // جلب الأقسام الفرعية عند تغيير الرئيسي داخل النافذة
    document.getElementById('m_main').onchange = async function() {
        if(!this.value) return;
        const r = await fetch(`/admin/get-sub-category-by-main-category/${this.value}`);
        const data = await r.json();
        document.getElementById('m_sub').innerHTML = '<option value="">-- اختر الفرعي --</option>' + Object.entries(data).map(([id, name]) => `<option value="${id}">${name}</option>`).join('');
    };

    document.getElementById('m_sub').onchange = async function() {
        if(!this.value) return;
        const r = await fetch(`/admin/get-sub-sub-category-by-sub-category/${this.value}`);
        const data = await r.json();
        document.getElementById('m_sub_sub').innerHTML = '<option value="">-- اختر فرع الفرع --</option>' + Object.entries(data).map(([id, name]) => `<option value="${id}">${name}</option>`).join('');
    };

    // باقي الوظائف (استيراد، بحث، حذف، تصدير) - كما هي تماماً
    document.getElementById('btn_imp').onclick = async function() {
        this.innerText = 'جاري السحب...';
        const r = await fetch('/admin/product?draw=1&start=0&length=15000', {headers:{'X-Requested-With':'XMLHttpRequest'}});
        const j = await r.json();
        allData = j.data;
        const brands = [...new Set(allData.map(p=>p.brand?.name).filter(Boolean))].sort();
        const mains = [...new Set(allData.map(p=>p.main_category?.name).filter(Boolean))].sort();
        document.getElementById('f_brand').innerHTML = '<option value="">-- الكل --</option>' + brands.map(b=>`<option value="${b}">${b}</option>`).join('');
        document.getElementById('f_main').innerHTML = '<option value="">-- الكل --</option>' + mains.map(m=>`<option value="${m}">${m}</option>`).join('');
        document.getElementById('f_main').onchange = function() {
            const subs = [...new Set(allData.filter(p=>p.main_category?.name === this.value).map(p=>p.sub_category?.name).filter(Boolean))].sort();
            document.getElementById('f_sub').innerHTML = '<option value="">-- الكل --</option>' + subs.map(s=>`<option value="${s}">${s}</option>`).join('');
        };
        document.getElementById('st_total').innerText = allData.length;
        this.innerText = 'تم الاستيراد ✅';
    };

    document.getElementById('btn_sho').onclick = function() {
        const tbody = document.getElementById('p_body'); tbody.innerHTML = '';
        const results = allData.filter(i => {
            if(document.getElementById('f_brand').value && i.brand?.name !== document.getElementById('f_brand').value) return false;
            if(document.getElementById('f_main').value && i.main_category?.name !== document.getElementById('f_main').value) return false;
            if(document.getElementById('f_sub').value && i.sub_category?.name !== document.getElementById('f_sub').value) return false;
            const tRows = document.querySelectorAll('#dynamic_filters_text .dyn-row');
            for(let r of tRows){
                let f = r.querySelector('.t-field').value; let v = r.querySelector('.t-value').value.toLowerCase();
                if(v && !i[f]?.toString().toLowerCase().includes(v)) return false;
            }
            if(mAct.checked){
                let ok = false;
                if(document.getElementById('cr').checked && i.heighest_rates==1) ok=true;
                if(document.getElementById('cs').checked && i.most_saled==1) ok=true;
                if(document.getElementById('cp').checked && i.most_popular==1) ok=true;
                if(document.getElementById('cn').checked && i.new_added==1) ok=true;
                if(!ok) return false;
            }
            return true;
        });

        results.forEach((p, idx) => {
            let tr = tbody.insertRow();
            tr.innerHTML = `<td><input type="checkbox" class="row-sel" data-id="${p.id}"></td>
                <td>${idx+1}</td>
                <td><button class="real-del-btn" data-id="${p.id}" style="background:#e74c3c;color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer">حذف</button></td>
                <td><b>${p.id}</b></td><td>${p.name}</td><td>${p.wow_price}</td><td>${p.quantity}</td>
                <td>${p.brand?.name||'-'}</td><td><small>${p.main_category?.name||'-'}</small></td><td><small>${p.sub_category?.name||'-'}</small></td>
                <td>${p.most_popular==1?'رائج':''}</td>`;
        });
        document.getElementById('st_match').innerText = results.length;
    };

    document.getElementById('btn_del_selected').onclick = async function() {
        let checked = Array.from(document.querySelectorAll('.row-sel:checked'));
        if(checked.length === 0) return alert('يرجى تحديد منتجات أولاً');
        if(!confirm(`حذف ${checked.length} منتجات؟`)) return;
        let token = document.querySelector('input[name="_token"]')?.value;
        for(let cb of checked){
            let id = cb.dataset.id;
            await fetch('/admin/product/'+id, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `_token=${token}&_method=DELETE` });
            cb.closest('tr').remove();
        }
        alert('تم الحذف');
    };

    document.getElementById('btn_xls').onclick = function() {
        const checked = Array.from(document.querySelectorAll('.row-sel:checked')).map(cb => cb.dataset.id.toString());
        let data = checked.length > 0 ? allData.filter(p => checked.includes(p.id.toString())) : allData;
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "WOW");
        XLSX.writeFile(wb, `WOW_Export_${new Date().getTime()}.xlsx`);
    };

    document.getElementById('all_chk_master').onclick = function() {
        document.querySelectorAll('.row-sel').forEach(cb => cb.checked = this.checked);
    };

    window.addTextFilter = function() {
        const div = document.createElement('div'); div.className = 'dyn-row';
        div.innerHTML = `<select class="t-field w-input" style="width:120px"><option value="name">الاسم</option><option value="id">ID</option></select>
            <input type="text" class="t-value w-input" placeholder="بحث..."><button onclick="this.parentElement.remove()">✖</button>`;
        document.getElementById('dynamic_filters_text').appendChild(div);
    };
    addTextFilter();
})();
