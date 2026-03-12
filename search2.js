(function(){
    if(document.getElementById('wow_final_v20')){document.getElementById('wow_final_v20').remove();return;}
    
    var html = `
    <div id="wow_final_v20" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#1a1a27;z-index:999999;color:#eee;font-family:tahoma,Arial;padding:20px;overflow-y:auto;direction:rtl;text-align:right;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:3px solid #27ae60;padding-bottom:10px;">
            <div style="display:flex;align-items:center;gap:15px;">
                <h2 style="color:#27ae60;margin:0;">البحث و الادارة المتقدمة للمنتجات ✨</h2>
                <button id="toggle_filters" style="background:#444;color:#fff;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-weight:bold;">➖ طي الفلاتر</button>
            </div>
            <div style="font-size:15px;">المخزن: <b id="st_total">0</b> | المطابق: <b id="st_match" style="color:#27ae60">0</b></div>
            <button id="close_btn_final" style="background:#e74c3c;color:#fff;border:none;padding:8px 25px;border-radius:8px;cursor:pointer;font-weight:bold;">إغلاق X</button>
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
                <button id="btn_open_move" class="btn-main" style="background:#8e44ad;">نقل القسم 📦</button>
                <button id="btn_xls" class="btn-main" style="background:#f39c12;">تصدير Excel 📊</button>
                <button id="btn_del_selected" class="btn-main" style="background:#c0392b;">حذف المحدد 🗑️</button>
                <button id="btn_reset" class="btn-main" style="background:#fff; color:#000;">تصفير الفلاتر 🔄</button>
            </div>
        </div>

        <div id="move_pop" style="display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#252537;padding:25px;border-radius:20px;z-index:1000001;width:400px;border:2px solid #8e44ad;box-shadow:0 0 50px #000;direction:rtl;">
            <h3 style="color:#8e44ad;margin-top:0;">نقل الأقسام (تعديل آمن)</h3>
            <div style="display:flex;flex-direction:column;gap:15px;margin:20px 0;">
                <div class="f-group"><label>القسم الرئيسي</label><select id="mv_main" class="w-input"></select></div>
                <div class="f-group"><label>القسم الفرعي</label><select id="mv_sub" class="w-input"><option value="">-- اختر الرئيسي --</option></select></div>
                <div class="f-group"><label>فرع الفرع</label><select id="mv_ssub" class="w-input"><option value="">-- اختر الفرعي --</option></select></div>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:10px;">
                <button id="mv_close" style="background:#444;border:none;color:#fff;padding:8px 20px;border-radius:8px;cursor:pointer;">إلغاء</button>
                <button id="mv_go" style="background:#8e44ad;border:none;color:#fff;padding:8px 20px;border-radius:8px;cursor:pointer;font-weight:bold;">تحديث القسم</button>
            </div>
        </div>

        <div style="background:#252537;border-radius:15px;overflow:auto;max-height:550px;">
            <table style="width:100%;border-collapse:collapse;text-align:right;font-size:12px;">
                <thead style="background:#2d2d44;position:sticky;top:0;z-index:10;">
                    <tr>
                        <th style="padding:10px;"><input type="checkbox" id="all_chk_master"></th>
                        <th>ت</th><th>الاجراءات</th><th>ID</th><th>الاسم</th><th>سعر واو</th><th>سعر السوق</th><th>الكمية</th><th>الماركة</th><th>الرئيسي</th><th>الفرعي</th><th>فرع الفرع</th><th>الرائج</th>
                    </tr>
                </thead>
                <tbody id="p_body"></tbody>
            </table>
        </div>
    </div>
    <iframe id="silent_frame" style="display:none;"></iframe>
    <style>
        .w-input { background:#12121d; color:#fff; border:1px solid #444; padding:8px; border-radius:8px; outline:none; width:100%; }
        .f-group { display:flex; flex-direction:column; gap:5px; }
        .btn-main { border:none; padding:12px 25px; border-radius:8px; cursor:pointer; font-weight:bold; color:#fff; }
        .dyn-row { display:flex; gap:10px; margin-bottom:10px; align-items:center; background:#2d2d44; padding:10px; border-radius:8px; }
        .edit-btn { background: #7367f0; color: #fff; border: none; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 11px; display: inline-block; }
        .del-btn { background: #ea5455; color: #fff; border: none; padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    
    if (!window.XLSX) {
        var script = document.createElement('script'); script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    let allData = [];

    // --- نظام النقل بالخلفية المضمون ---
    async function getCats() {
        const r = await fetch('/admin/product/create');
        const t = await r.text();
        const main = new DOMParser().parseFromString(t, 'text/html').querySelector('select[name="main_category_id"]');
        document.getElementById('mv_main').innerHTML = Array.from(main.options).map(o => `<option value="${o.value}">${o.text}</option>`).join('');
    }

    document.getElementById('mv_main').onchange = async function() {
        const r = await fetch(`/admin/get-sub-category-by-main-category/${this.value}`);
        const d = await r.json();
        document.getElementById('mv_sub').innerHTML = '<option value="">-- اختر الفرعي --</option>' + Object.entries(d).map(([id, n]) => `<option value="${id}">${n}</option>`).join('');
    };

    document.getElementById('mv_sub').onchange = async function() {
        const r = await fetch(`/admin/get-sub-sub-category-by-sub-category/${this.value}`);
        const d = await r.json();
        document.getElementById('mv_ssub').innerHTML = '<option value="">-- اختر فرع الفرع --</option>' + Object.entries(d).map(([id, n]) => `<option value="${id}">${n}</option>`).join('');
    };

    document.getElementById('btn_open_move').onclick = async () => {
        if(document.querySelectorAll('.row-sel:checked').length === 0) return alert('حدد منتجات أولاً');
        await getCats();
        document.getElementById('move_pop').style.display = 'block';
    };

    document.getElementById('mv_close').onclick = () => document.getElementById('move_pop').style.display = 'none';

    document.getElementById('mv_go').onclick = async function() {
        let checked = Array.from(document.querySelectorAll('.row-sel:checked'));
        let mid = document.getElementById('mv_main').value;
        let sid = document.getElementById('mv_sub').value;
        let ssid = document.getElementById('mv_ssub').value;
        if(!mid) return alert('اختر الرئيسي');
        this.innerText = 'جاري التعديل...';
        const frame = document.getElementById('silent_frame');
        for(let cb of checked) {
            let id = cb.dataset.id;
            await new Promise(resolve => {
                frame.src = `/admin/product/${id}/edit`;
                frame.onload = function() {
                    const fDoc = frame.contentDocument;
                    const form = fDoc.querySelector('form[action*="/admin/product/"]');
                    if(form) {
                        fDoc.querySelector('select[name="main_category_id"]').value = mid;
                        const sub = fDoc.querySelector('select[name="sub_category_id"]');
                        if(sub) sub.innerHTML = `<option value="${sid}" selected>${sid}</option>`;
                        const ssub = fDoc.querySelector('select[name="sub_sub_category_id"]');
                        if(ssub) ssub.innerHTML = `<option value="${ssid}" selected>${ssid}</option>`;
                        form.submit();
                        setTimeout(resolve, 2000);
                    } else { resolve(); }
                };
            });
            cb.closest('tr').style.background = '#1e3a2a';
        }
        this.innerText = 'تحديث القسم';
        document.getElementById('move_pop').style.display = 'none';
        alert('تم النقل بنجاح ✅');
    };

    // --- وظائف الفلاتر (v20.1 الأصلية) ---
    document.getElementById('close_btn_final').onclick = () => document.getElementById('wow_final_v20').remove();
    document.getElementById('toggle_filters').onclick = function() {
        let inner = document.getElementById('filters_inner');
        inner.style.display = (inner.style.display === "none") ? "block" : "none";
        this.innerText = (inner.style.display === "none") ? "➕ فك الفلاتر" : "➖ طي الفلاتر";
    };

    const mAct = document.getElementById('m_act');
    const mBox = document.getElementById('m_box');
    mAct.onclick = function() { mBox.style.opacity = this.checked ? "1" : "0.5"; mBox.style.pointerEvents = this.checked ? "auto" : "none"; };

    window.addTextFilter = function() {
        const div = document.createElement('div'); div.className = 'dyn-row';
        div.innerHTML = `<select class="t-field w-input" style="width:150px"><option value="name">اسم المنتج</option><option value="description">الوصف</option><option value="id">ID</option></select>
            <input type="text" class="t-value w-input" style="flex:1" placeholder="بحث...">
            <button onclick="this.parentElement.remove()" style="color:red;background:none;border:none;cursor:pointer;font-size:18px">✖</button>`;
        document.getElementById('dynamic_filters_text').appendChild(div);
    };
    document.getElementById('add_t_btn').onclick = addTextFilter;

    window.addNumFilter = function() {
        const div = document.createElement('div'); div.className = 'dyn-row';
        div.innerHTML = `<select class="n-field w-input" style="width:130px"><option value="quantity">الكمية</option><option value="wow_price">سعر واو</option><option value="market_price">سعر السوق</option></select>
            <select class="n-mode w-input" style="width:100px" onchange="this.parentElement.querySelector('.n-v2').style.display = (this.value === 'range' ? 'block' : 'none');"><option value="eq">يساوي</option><option value="gt">أكبر من</option><option value="lt">أصغر من</option><option value="range">بين</option></select>
            <input type="number" class="n-v1 w-input" style="width:90px" placeholder="قيمة">
            <input type="number" class="n-v2 w-input" style="width:90px;display:none" placeholder="إلى">
            <button onclick="this.parentElement.remove()" style="color:red;background:none;border:none;cursor:pointer;font-size:18px">✖</button>`;
        document.getElementById('dynamic_filters_num').appendChild(div);
    };
    document.getElementById('add_n_btn').onclick = addNumFilter;

    document.getElementById('btn_imp').onclick = async function() {
        this.innerText = 'جاري السحب...';
        const r = await fetch('/admin/product?draw=1&start=0&length=15000', {headers:{'X-Requested-With':'XMLHttpRequest'}});
        const j = await r.json(); allData = j.data;
        const brands = [...new Set(allData.map(p=>p.brand?.name).filter(Boolean))].sort();
        const mains = [...new Set(allData.map(p=>p.main_category?.name).filter(Boolean))].sort();
        document.getElementById('f_brand').innerHTML = '<option value="">-- الكل --</option>' + brands.map(b=>`<option value="${b}">${b}</option>`).join('');
        document.getElementById('f_main').innerHTML = '<option value="">-- الكل --</option>' + mains.map(m=>`<option value="${m}">${m}</option>`).join('');
        document.getElementById('f_main').onchange = function() {
            const subs = [...new Set(allData.filter(p=>p.main_category?.name === this.value).map(p=>p.sub_category?.name).filter(Boolean))].sort();
            document.getElementById('f_sub').innerHTML = '<option value="">-- الكل --</option>' + subs.map(s=>`<option value="${s}">${s}</option>`).join('');
        };
        this.innerText = 'تم الاستيراد ✅';
        document.getElementById('st_total').innerText = allData.length;
    };

    document.getElementById('btn_sho').onclick = function() {
        const tbody = document.getElementById('p_body'); tbody.innerHTML = '';
        const fmt = (n) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const results = allData.filter(i => {
            if(document.getElementById('f_brand').value && i.brand?.name !== document.getElementById('f_brand').value) return false;
            if(document.getElementById('f_main').value && i.main_category?.name !== document.getElementById('f_main').value) return false;
            if(document.getElementById('f_sub').value && i.sub_category?.name !== document.getElementById('f_sub').value) return false;
            if(mAct.checked){
                let match = false; let any = false;
                if(document.getElementById('cr').checked){ any=true; if(i.heighest_rates==1) match=true; }
                if(document.getElementById('cs').checked){ any=true; if(i.most_saled==1) match=true; }
                if(document.getElementById('cp').checked){ any=true; if(i.most_popular==1) match=true; }
                if(document.getElementById('cn').checked){ any=true; if(i.new_added==1) match=true; }
                if(any && !match) return false;
            }
            return true;
        });

        results.forEach((p, idx) => {
            let tr = tbody.insertRow();
            let trnd = [];
            if(p.heighest_rates==1) trnd.push("تقييم"); if(p.most_saled==1) trnd.push("مبيع");
            if(p.most_popular==1) trnd.push("رواج"); if(p.new_added==1) trnd.push("جديد");
            tr.innerHTML = `<td><input type="checkbox" class="row-sel" data-id="${p.id}"></td>
                <td>${idx+1}</td>
                <td><div style="display:flex;gap:4px"><a href="/admin/product/${p.id}/edit" target="_blank" class="edit-btn">تعديل</a>
                    <button class="del-btn real-del-btn" data-id="${p.id}">حذف</button></div></td>
                <td>${p.id}</td><td>${p.name}</td><td>${fmt(p.wow_price)}</td><td>${fmt(p.market_price)}</td><td>${p.quantity}</td>
                <td>${p.brand?.name||'-'}</td><td><small>${p.main_category?.name||'-'}</small></td>
                <td><small>${p.sub_category?.name||'-'}</small></td><td><small>${p.sub_sub_category?.name||'-'}</small></td>
                <td style="color:#f1c40f;font-size:10px">${trnd.join('|')}</td>`;
        });
        document.getElementById('st_match').innerText = results.length;
    };

    document.addEventListener('click', function(e) {
        if(e.target && e.target.classList.contains('real-del-btn')){
            if(!confirm('حذف؟')) return;
            let id = e.target.dataset.id;
            let t = document.querySelector('input[name="_token"]')?.value;
            fetch('/admin/product/'+id, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `_token=${t}&_method=DELETE` }).then(() => e.target.closest('tr').remove());
        }
    });

    document.getElementById('all_chk_master').onclick = function() {
        document.querySelectorAll('.row-sel').forEach(cb => cb.checked = this.checked);
    };
    addTextFilter();
})();
