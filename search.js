(function(){
    if(document.getElementById('wow_final_v19')){document.getElementById('wow_final_v19').remove();return;}
    
    var html = `
    <div id="wow_final_v19" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#1a1a27;z-index:999999;color:#eee;font-family:tahoma,Arial;padding:20px;overflow-y:auto;direction:rtl;text-align:right;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:3px solid #27ae60;padding-bottom:10px;">
            <div style="display:flex;align-items:center;gap:15px;">
                <h2 style="color:#27ae60;margin:0;">فلترة المنتجات ✨</h2>
                <button id="toggle_filters" style="background:#444;color:#fff;border:none;padding:5px 12px;border-radius:5px;cursor:pointer;font-weight:bold;">➖ طي الفلاتر</button>
            </div>
            <div style="font-size:15px;">المخزن: <b id="st_total">0</b> | المطابق: <b id="st_match" style="color:#27ae60">0</b></div>
            <button onclick="document.getElementById('wow_final_v19').remove()" style="background:#e74c3c;color:#fff;border:none;padding:8px 25px;border-radius:8px;cursor:pointer;font-weight:bold;">إغلاق X</button>
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
                <button id="btn_xls" class="btn-main" style="background:#f39c12;">تصدير Excel 📊</button>
                <button id="btn_reset" class="btn-main" style="background:#fff; color:#000;">تصفير الفلاتر 🔄</button>
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
    <style>
        .w-input { background:#12121d; color:#fff; border:1px solid #444; padding:8px; border-radius:8px; outline:none; }
        .f-group { display:flex; flex-direction:column; gap:5px; }
        .btn-main { border:none; padding:12px 25px; border-radius:8px; cursor:pointer; font-weight:bold; color:#fff; }
        .dyn-row { display:flex; gap:10px; margin-bottom:10px; align-items:center; background:#2d2d44; padding:10px; border-radius:8px; }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    
    // تحميل مكتبة الإكسل فوراً
    if (!window.XLSX) {
        var script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    let allData = [];

    // طي الفلاتر
    document.getElementById('toggle_filters').onclick = function() {
        let inner = document.getElementById('filters_inner');
        if(inner.style.display === "none") { inner.style.display = "block"; this.innerText = "➖ طي الفلاتر"; }
        else { inner.style.display = "none"; this.innerText = "➕ فك الفلاتر"; }
    };

    // الرواج
    const mAct = document.getElementById('m_act');
    const mBox = document.getElementById('m_box');
    mAct.onclick = function() { mBox.style.opacity = this.checked ? "1" : "0.5"; mBox.style.pointerEvents = this.checked ? "auto" : "none"; };

    // فلاتر ديناميكية
    window.addTextFilter = function() {
        const div = document.createElement('div'); div.className = 'dyn-row';
        div.innerHTML = `<select class="t-field w-input" style="width:150px"><option value="name">اسم المنتج</option><option value="description">الوصف</option><option value="id">ID</option></select>
            <input type="text" class="t-value w-input" style="flex:1" placeholder="اكتب للبحث...">
            <button onclick="this.parentElement.remove()" style="color:red;background:none;border:none;cursor:pointer;font-size:18px">✖</button>`;
        document.getElementById('dynamic_filters_text').appendChild(div);
    };
    document.getElementById('add_t_btn').onclick = addTextFilter;

    window.addNumFilter = function() {
        const div = document.createElement('div'); div.className = 'dyn-row';
        div.innerHTML = `<select class="n-field w-input" style="width:130px"><option value="quantity">الكمية</option><option value="wow_price">سعر واو</option><option value="market_price">سعر السوق</option></select>
            <select class="n-mode w-input" style="width:100px" onchange="this.parentElement.querySelector('.n-v2').style.display = this.value === 'range' ? 'block' : 'none';"><option value="eq">يساوي</option><option value="gt">أكبر من</option><option value="lt">أصغر من</option><option value="range">بين</option></select>
            <input type="number" class="n-v1 w-input" style="width:90px" placeholder="القيمة">
            <input type="number" class="n-v2 w-input" style="width:90px;display:none" placeholder="إلى">
            <button onclick="this.parentElement.remove()" style="color:red;background:none;border:none;cursor:pointer;font-size:18px">✖</button>`;
        document.getElementById('dynamic_filters_num').appendChild(div);
    };
    document.getElementById('add_n_btn').onclick = addNumFilter;

    // تصفير
    document.getElementById('btn_reset').onclick = function() {
        document.getElementById('f_brand').value = ""; document.getElementById('f_main').value = "";
        document.getElementById('f_sub').innerHTML = '<option value="">-- اختر الرئيسي --</option>';
        document.getElementById('dynamic_filters_text').innerHTML = ""; document.getElementById('dynamic_filters_num').innerHTML = "";
        mAct.checked = false; mAct.onclick();
        document.querySelectorAll('.t_c').forEach(c => c.checked = false);
        addTextFilter();
    };

    // استيراد
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

    // إظهار النتائج
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
            const nRows = document.querySelectorAll('#dynamic_filters_num .dyn-row');
            for(let r of nRows){
                let f = r.querySelector('.n-field').value; let m = r.querySelector('.n-mode').value;
                let v1 = parseFloat(r.querySelector('.n-v1').value); let v2 = parseFloat(r.querySelector('.n-v2').value);
                let val = parseFloat(i[f]) || 0;
                if(!isNaN(v1)){
                    if(m==='eq' && val !== v1) return false;
                    if(m==='gt' && val <= v1) return false;
                    if(m==='lt' && val >= v1) return false;
                    if(m==='range' && (val < v1 || val > v2)) return false;
                }
            }
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
            let tr = document.createElement('tr'); tr.style.borderBottom = '1px solid #333';
            let trnd = [];
            if(p.heighest_rates==1) trnd.push("الأعلى تقييماً");
            if(p.most_saled==1) trnd.push("الأكثر مبيعاً");
            if(p.most_popular==1) trnd.push("الأكثر رواجاً");
            if(p.new_added==1) trnd.push("مضاف حديثاً");
            const fmt = (n) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            tr.innerHTML = `<td><input type="checkbox" class="row-sel" data-id="${p.id}"></td>
                <td>${idx+1}</td>
                <td><div style="display:flex;gap:4px">
                    <a href="/admin/product/${p.id}/edit" target="_blank" style="background:#3498db;color:#fff;padding:4px 8px;border-radius:4px;text-decoration:none">تعديل</a>
                    <button class="real-del-btn" data-id="${p.id}" style="background:#e74c3c;color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer">حذف</button>
                </div></td>
                <td><b>${p.id}</b></td><td>${p.name}</td><td style="color:#2ecc71;font-weight:bold">${fmt(p.wow_price)}</td><td style="color:#aaa">${fmt(p.market_price)}</td><td>${p.quantity}</td>
                <td>${p.brand?.name||'-'}</td><td><small>${p.main_category?.name||'-'}</small></td><td><small>${p.sub_category?.name||'-'}</small></td><td><small>${p.sub_sub_category?.name||'-'}</small></td>
                <td style="color:#f1c40f;font-size:10px">${trnd.join(' | ')}</td>`;
            tbody.appendChild(tr);
        });
        document.getElementById('st_match').innerText = results.length;
    };

    // كود الحذف المضمون (v19)
    document.addEventListener('click', function(e) {
        if(e.target && e.target.classList.contains('real-del-btn')){
            if(!confirm('حذف نهائي؟')) return;
            let id = e.target.dataset.id;
            let currentToken = document.querySelector('input[name="_token"]')?.value;
            fetch('/admin/product/'+id, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `_token=${currentToken}&_method=DELETE`
            }).then(() => { e.target.closest('tr').remove(); });
        }
    });

    // كود التصدير المضمون (v19)
    document.getElementById('btn_xls').onclick = function() {
        const checked = Array.from(document.querySelectorAll('.row-sel:checked')).map(cb => cb.dataset.id.toString());
        let exportList = [];
        if(checked.length > 0) {
            exportList = allData.filter(p => checked.includes(p.id.toString()));
        } else {
            const visible = Array.from(document.querySelectorAll('.row-sel')).map(cb => cb.dataset.id.toString());
            exportList = allData.filter(p => visible.includes(p.id.toString()));
        }
        if(exportList.length === 0) return alert('لا توجد بيانات');
        const ws = XLSX.utils.json_to_sheet(exportList);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "WOW");
        XLSX.writeFile(wb, `WOW_Export_${new Date().getTime()}.xlsx`);
    };

    document.getElementById('all_chk_master').onclick = function() {
        document.querySelectorAll('.row-sel').forEach(cb => cb.checked = this.checked);
    };

    addTextFilter();
})();
