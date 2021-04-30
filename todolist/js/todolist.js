$(function() {
    // alert(11);
    // 1. 按下回车(回车对应的是Ascll中的13) 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load(); // 每次页面加载成功就调用这个函数
    $("#title").on("keydown", function(e) {
        // 判断用户是否按的是回车键
        if (e.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                // 先读取本地存储原来的数据
                var local = getDate();
                // console.log(local);

                // 把local数组进行更新数据 把最新的数据追加给local数组
                // 给数组添加了一个新的对象 用户输入的对象
                local.push({ title: $(this).val(), done: false });
                // 把这个数组local 存储给本地存储
                saveDate(local);

                // 2. toDolist 本地存储数据渲染加载到页面当中
                load();
                // 当文本框输入完内容就将他清空
                $(this).val("");
            }
        }
    });

    // 3. toDolist 删除操作 通过索引号进行删除
    $("ol,ul").on("click", "a", function() {
        // alert("删除成功");
        // 先获取本地存储
        var data = getDate();
        // console.log(111);

        // 修改数据
        // 获取当前的索引号
        var index = $(this).attr("id");
        // console.log(index);
        // 删除数据  splice(删除谁, 删除几个)
        data.splice(index, 1);

        // 保存到本地存储
        saveDate(data);

        // 重新渲染页面
        load();
    });

    // 4. toDoList 正在进行和已完成选项操作
    $("ol,ul").on("click", "input", function() {
        // 先获取本地存储的数据
        var data = getDate();

        // 修改数据
        var index = $(this).siblings("a").attr("id");
        // console.log(index);
        data[index].done = $(this).prop("checked");
        // console.log(data);

        // 保存到本地存储
        saveDate(data);

        // 重新渲染页面
        load();
    })

    // 读取本地存储的数据（一把的写法是自定以一个函数写在里面）
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的  但是我们需要的对象格式
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载加载数据
    function load() {
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已完成的个数

        // 读取本地存储数据
        var data = getDate();
        // console.log(data);

        // 遍历之前先要清空ol里面的元素内容
        $("ol,ul").empty();

        // 遍历数据
        $.each(data, function(i, n) {
            // 判断是否完成 完成放到ul里  未完成放到ol里
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            } else {
                // prepend 追加
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
});